// Imports 
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers'); //https://github.com/OpenZeppelin, https://docs.openzeppelin.com/test-helpers/0.5/
const { expect } = require('chai');                                              //https://www.chaijs.com/
const Voting = artifacts.require("Voting");

contract('Voting', function (accounts) {
    //Variables Owner
    const owner = accounts[0];

    //Variables voter
    const voterA = accounts[1];
    const voterB = accounts[2];
    const voterC = accounts[3];

    //Variables proposal
    //Vide
    const emptyProp = "";
    //First
    const proposal = "FirstProposal";
    const idProposal = new BN(0);
    //2nd proposal
    const secondProposal = "SecondProposal";
    const secondIdProposal = new BN(1);
    let VotingInstance;


    // All testing to OnlyOwner ! 1-Addvoter, 2-3 Start and End proposal, 4-5 Start and End Voting , 6-count Votes
    context("Testing OnlyOwner", function () {

        before('reuse deployed VotingInstance to OnlyOwner', async () => {
            VotingInstance = await Voting.deployed();
        });

        it('onlyOwner must be able to addvoter', async () => {
            await expectRevert(VotingInstance.addVoter(voterA, { 'from': voterA }), "Ownable: caller is not the owner");
        });

        it('onlyOwner must be able to startVotingSession', async () => {
            await expectRevert(VotingInstance.startVotingSession({ 'from': voterA }), "Ownable: caller is not the owner");
        });

        it('onlyOwner must be able to endVotingSession', async () => {
            await expectRevert(VotingInstance.endVotingSession({ 'from': voterA }), "Ownable: caller is not the owner");
        });

        it('onlyOwner must be able to tallyVotes', async () => {
            await expectRevert(VotingInstance.tallyVotes({ 'from': voterA }), "Ownable: caller is not the owner");
        });
        it('onlyOwner must be able to StartProposalRegistering', async () => {
            await expectRevert(VotingInstance.startProposalsRegistering({ 'from': voterA }), "Ownable: caller is not the owner");
        });

        it('onlyOwner must be able to endProposalsRegistering', async () => {
            await expectRevert(VotingInstance.endProposalsRegistering({ 'from': voterA }), "Ownable: caller is not the owner");
        });


    });

    // All testing to OnlyVoter ! 1-getVoter, 2-set Vote, 3-get one proposal, 4- add proposal
    context("Testing OnlyVoter", function () {
        // i use before  because is run once before all the tests in a describe
        before('reuse deployed VotingInstance to OnlyVoter', async () => { // same as line 30 , for onlyVoter this time !
            VotingInstance = await Voting.deployed();
        });

        it('onlyVoters must be able to getVoter', async () => { // optimize this !
            await expectRevert(VotingInstance.getVoter(voterA, { 'from': voterA }), "You're not a voter");
        });

        it('onlyVoters must be able to setVote', async () => {
            await expectRevert(VotingInstance.setVote(idProposal, { 'from': voterA }), "You're not a voter");
        });

        it('onlyVoters must be able to getOneProposal', async () => {
            await expectRevert(VotingInstance.getOneProposal(idProposal, { 'from': voterA }), "You're not a voter");
        });

        it('onlyVoters must be able to addProposal', async () => {
            await expectRevert(VotingInstance.addProposal(proposal, { 'from': voterA }), "You're not a voter");
        });

    });

    //Testing 11/12 requires in this context.
    context("Testing each requirement", function () {
        // i use beforeEach because is run before each test in a describe
        beforeEach('must setup the contract VotingInstance', async () => { // // same as line 30,63  , for requires this time !
            VotingInstance = await Voting.new({ 'from': owner });
        });

        //Voting require 1 line  65
        it('onlyOwner must add voters only during RegisteringVoters state', async () => {
            await VotingInstance.startProposalsRegistering({ 'from': owner });
            await expectRevert(VotingInstance.addVoter(voterA, { 'from': owner }), "Voters registration is not open yet");
        });

        //Voting require 2 line  66
        it('voter must be registered only once', async () => {
            await VotingInstance.addVoter(voterA, { 'from': owner });
            await expectRevert(VotingInstance.addVoter(voterA, { 'from': owner }), "Already registered");
        });

        //Voting require 3 Line 83
        it('voter must add proposals only during ProposalsRegistration state', async () => {
            await VotingInstance.addVoter(voterA, { 'from': owner });
            await expectRevert(VotingInstance.addProposal(proposal, { 'from': voterA }), "Proposals are not allowed yet");
        });

        //Voting require 4 line 84
        it('voter mustnt add empty proposal', async () => {
            await VotingInstance.addVoter(voterA, { 'from': owner });
            await VotingInstance.startProposalsRegistering({ 'from': owner });
            await expectRevert(VotingInstance.addProposal(emptyProp, { 'from': voterA }), "Vous ne pouvez pas ne rien proposer");
        });

        //Voting require 5 line  96  
        it('voter must vote only during VotingSession state', async () => {
            await VotingInstance.addVoter(voterA, { 'from': owner });
            await expectRevert(VotingInstance.setVote(idProposal, { 'from': voterA }), "Voting session havent started yet");
        });

        //Voting require 6line 97
        it('voter must vote only once', async () => {
            await VotingInstance.addVoter(voterA, { 'from': owner });
            await VotingInstance.startProposalsRegistering({ 'from': owner });
            await VotingInstance.addProposal(proposal, { 'from': voterA });
            await VotingInstance.endProposalsRegistering({ 'from': owner });
            await VotingInstance.startVotingSession({ 'from': owner });
            await VotingInstance.setVote(idProposal, { 'from': voterA });
            await expectRevert(VotingInstance.setVote(idProposal, { 'from': voterA }), "You have already voted");
        });

        // //TODO Voting require 7 line 98
        // it('should not vote for a non-existing proposal', async () => {
        //     await expectRevert(VotingInstance.setVote(new BN(10), { from: voterB }), "Proposal not found");
        // });

        //Voting require 8 line 135
        it('proposal registration must start after registering voters', async () => {
            await VotingInstance.startProposalsRegistering({ 'from': owner });
            await expectRevert(VotingInstance.startProposalsRegistering({ 'from': owner }), "Registering proposals cant be started now");
        });
        //Voting require 9 line 141
        it('end of proposal registration must start after registering proposals', async () => {
            await expectRevert(VotingInstance.endProposalsRegistering({ 'from': owner }), "Registering proposals havent started yet");
        });
        //Voting require 10 line 147
        it('voting session must start after end of registering proposals', async () => {
            await expectRevert(VotingInstance.startVotingSession({ 'from': owner }), "Registering proposals phase is not finished");
        });

        //Voting require 11 line 153
        it('ending voting session must start during voting session', async () => {
            await expectRevert(VotingInstance.endVotingSession({ 'from': owner }), "Voting session havent started yet");
        });
        //Voting require 12 line 184
        it('tally votes must start after ending voting session', async () => {
            await expectRevert(VotingInstance.tallyVotes({ 'from': owner }), "Current status is not voting session ended");
        });

    });

    //Testing 3 emit  VotedRegistered, ProposalRegistered and Voted ! 
    context("Testing Events", function () {

        beforeEach('must setup the contract VotingInstance to testing Events', async () => {
            VotingInstance = await Voting.new({ 'from': owner });
        });

        //Voting emit n°1 line 69
        it('must emit VoterRegistered event', async () => {
            VotingInstance = await Voting.new({ 'from': owner });
            expectEvent(await VotingInstance.addVoter(voterA, { 'from': owner }), 'VoterRegistered', { voterAddress: voterA });
        });

        //Voting emit°2 line 90
        it('must emit ProposalRegistered event', async () => {
            await VotingInstance.addVoter(voterA, { 'from': owner });
            await VotingInstance.startProposalsRegistering({ 'from': owner });
            expectEvent(await VotingInstance.addProposal(proposal, { 'from': voterA }), 'ProposalRegistered', { proposalId: new BN(0) });
        });

        //Voting emit°3 line 104
        it('must emit Voted event', async () => {
            await VotingInstance.addVoter(voterA, { 'from': owner });
            await VotingInstance.startProposalsRegistering({ 'from': owner });
            await VotingInstance.addProposal(proposal, { 'from': voterA });
            await VotingInstance.endProposalsRegistering({ 'from': owner });
            await VotingInstance.startVotingSession({ 'from': owner });
            expectEvent(await VotingInstance.setVote(idProposal, { 'from': voterA }), 'Voted', { voter: voterA, proposalId: new BN(0) });
        });
    });

    //Test 5 emits to WorkflowSatus events => start/ending proposal, stat/ending voting session, count.
    context("Testing WorkflowStatus Events ", function () {

        before('must setup the contract VotingInstance', async () => {
            VotingInstance = await Voting.new({ 'from': owner });
        });

        //Voting Emit n°1 line 137
        it('must emit WorkflowStatus event to starting proposal registering', async () => {
            expectEvent(await VotingInstance.startProposalsRegistering({ 'from': owner }), 'WorkflowStatusChange', { previousStatus: new BN(0), newStatus: new BN(1) });
        });

        //Voting Emit n°2 line 143
        it('must emit  WorkflowStatus event to ending proposal registering', async () => {
            expectEvent(await VotingInstance.endProposalsRegistering({ 'from': owner }), 'WorkflowStatusChange', { previousStatus: new BN(1), newStatus: new BN(2) });
        });

        //Voting Emit n°3 line 149
        it('must emit WorkflowStatus event to starting voting session', async () => {
            expectEvent(await VotingInstance.startVotingSession({ 'from': owner }), 'WorkflowStatusChange', { previousStatus: new BN(2), newStatus: new BN(3) });
        });

        //Voting Emit n°4 line 155
        it('must emit WorkflowStatus event to ending voting session', async () => {
            expectEvent(await VotingInstance.endVotingSession({ 'from': owner }), 'WorkflowStatusChange', { previousStatus: new BN(3), newStatus: new BN(4) });
        });

        //Voting Emit n°5 line 194
        it('must emit WorkflowStatus event to count in endingSession', async () => {
            expectEvent(await VotingInstance.tallyVotes({ 'from': owner }), 'WorkflowStatusChange', { previousStatus: new BN(4), newStatus: new BN(5) });
        });
    });

    //we test the registration of the vote
    context("Testing Registering Voter", function () {

        it('Registering voter', async () => {
            VotingInstance = await Voting.new({ 'from': owner });
            await VotingInstance.addVoter(voterA, { 'from': owner });

            let voterStated = (await VotingInstance.getVoter(voterA, { 'from': voterA })).isRegistered;
            expect(voterStated, "Voter wasn't registered.").to.be.true;
        });

    });

    //Proposal Phase
    context("Testing Registering Proposals", function () {

        beforeEach('must setup the contract VotingInstance', async () => {
            VotingInstance = await Voting.new({ 'from': owner });

            await VotingInstance.addVoter(voterA, { 'from': owner });
            await VotingInstance.startProposalsRegistering({ 'from': owner });
        });

        it('added proposal in arrayPropo', async () => {
            await VotingInstance.addProposal(proposal, { 'from': voterA });
            let descriptionProposalAfterRegisteringProposal = (await VotingInstance.getOneProposal(idProposal, { 'from': voterA })).description;
            expect(descriptionProposalAfterRegisteringProposal).to.equal(proposal, "Proposal wasn't added in the list");
        });

        it('added lot of proposal in arrayPropo', async () => {
            let numberOfProposals = 10;
            for (let i = 0; i < numberOfProposals; i++) {
                await VotingInstance.addProposal(proposal + i, { 'from': voterA });
            }
            let getlastProposalDescription = (await VotingInstance.getOneProposal(new BN(numberOfProposals - 1), { 'from': voterA })).description;
            expect(getlastProposalDescription).to.equal(proposal + (numberOfProposals - 1), "Proposal wasn't added in the list");
        });
    });

    // Global workflow
    context("Testing State Change", function () {

        before('must setup the contract VotingInstance', async () => {
            VotingInstance = await Voting.new({ 'from': owner });
        });

        it('must start with RegisteringVoters status', async () => {
            let status = (await VotingInstance.workflowStatus({ 'from': owner }));
            expect(status).to.be.bignumber.equal(new BN(0), "RegisteringVoters not the current status.");
        });

        it('must change to ProposalsRegistrationStarted status', async () => {
            await VotingInstance.startProposalsRegistering({ 'from': owner })
            let status = (await VotingInstance.workflowStatus({ 'from': owner }));
            expect(status).to.be.bignumber.equal(new BN(1), "ProposalsRegistrationStarted not the current status.");
        });

        it('must change to ProposalsRegistrationEnded status', async () => {
            await VotingInstance.endProposalsRegistering({ 'from': owner })
            let status = (await VotingInstance.workflowStatus({ 'from': owner }));
            expect(status).to.be.bignumber.equal(new BN(2), "ProposalsRegistrationEnded not the current status.");
        });

        it('must change to VotingSessionStarted status', async () => {
            await VotingInstance.startVotingSession({ 'from': owner })
            let status = (await VotingInstance.workflowStatus({ 'from': owner }));
            expect(status).to.be.bignumber.equal(new BN(3), "VotingSessionStarted not the current status.");
        });

        it('must change to VotingSessionEnded status', async () => {
            await VotingInstance.endVotingSession({ 'from': owner })
            let status = (await VotingInstance.workflowStatus({ 'from': owner }));
            expect(status).to.be.bignumber.equal(new BN(4), "VotingSessionEnded not the current status.");
        });
    });

    //Voting phase
    context("Validation voting phase", function () {

        beforeEach(async () => {
            VotingInstance = await Voting.new({ 'from': owner });
            await VotingInstance.addVoter(voterA, { 'from': owner });
            await VotingInstance.addVoter(voterB, { 'from': owner });
            await VotingInstance.startProposalsRegistering({ 'from': owner });
            await VotingInstance.addProposal(proposal, { 'from': voterA });
            await VotingInstance.endProposalsRegistering({ 'from': owner });
            await VotingInstance.startVotingSession({ 'from': owner });
        });
        //Save the Id of Voter'choice
        it('should save the proposalId that the voter has chosen', async () => {
            let voterBeforeVote = await VotingInstance.getVoter(voterA, { 'from': voterA });
            expect(new BN(voterBeforeVote.votedProposalId)).to.be.bignumber.equal(idProposal, "Proposal Id already save.");
            await VotingInstance.setVote(idProposal, { 'from': voterA });
            let voterAfterVote = await VotingInstance.getVoter(voterA, { 'from': voterA });
            expect(new BN(voterAfterVote.votedProposalId)).to.be.bignumber.equal(idProposal, "Proposal Id was not save properly.");
        });
        // Save if Voter voted or not
        it('should save Voter has voted or not', async () => {
            await VotingInstance.setVote(idProposal, { 'from': voterA });
            let voterAfterVote = await VotingInstance.getVoter(voterA, { 'from': voterA });
            expect(voterAfterVote.hasVoted, "Voter's vote was not save.").to.be.true;
        });
        //Increment , counting vote
        it('should increment proposal vote count', async () => {
            let countingBeforeVote = (await VotingInstance.getOneProposal(idProposal, { 'from': voterA })).voteCount;
            await VotingInstance.setVote(idProposal, { 'from': voterA });
            let countingAferVote = (await VotingInstance.getOneProposal(idProposal, { 'from': voterA })).voteCount;
            expect(new BN(countingAferVote)).to.be.bignumber.equal(new BN(countingBeforeVote + 1), "voteCount to proposal wasnt incremented.");
        });


    });

    // Tallying phase !
    context("Validate Tallying phase", function () {

        before(async () => {
            VotingInstance = await Voting.new({ 'from': owner });
        });

        it('Should tallyVotes', async () => {
            await VotingInstance.addVoter(voterA, { 'from': owner });
            await VotingInstance.addVoter(voterB, { 'from': owner });
            await VotingInstance.addVoter(voterC, { 'from': owner });
            await VotingInstance.startProposalsRegistering({ 'from': owner });
            await VotingInstance.addProposal(proposal, { 'from': voterA });
            await VotingInstance.addProposal(secondProposal, { 'from': voterA });
            await VotingInstance.endProposalsRegistering({ 'from': owner });
            await VotingInstance.startVotingSession({ 'from': owner });
            await VotingInstance.setVote(idProposal, { 'from': voterA })
            await VotingInstance.setVote(idProposal, { 'from': voterB })
            await VotingInstance.setVote(secondIdProposal, { 'from': voterC })
            await VotingInstance.endVotingSession({ 'from': owner });
            let winningProposalId = await VotingInstance.winningProposalID({ 'from': owner });
            expect(new BN(winningProposalId)).to.be.bignumber.equal(idProposal, "Wrong winning proposal Id");
        });
  
    });

});