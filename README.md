# tp2_Voting_Test
> server:            http://127.0.0.1:8555
> truffle:           v5.4.29
> ganache-core:      v2.13.0
> solidity-coverage: v0.7.20

Network Info
============
> id:      *
> port:    8555
> network: soliditycoverage


Instrumenting for coverage...
=============================

> Voting.sol

Compiling your contracts...
===========================
> Compiling ./.coverage_contracts/Voting.sol
> Compiling @openzeppelin/contracts/access/Ownable.sol
> Compiling @openzeppelin/contracts/utils/Context.sol
> Artifacts written to /home/fofo/2_voting_Tests/.coverage_artifacts/contracts
> Compiled successfully using:
   - solc: 0.8.12+commit.f00d7308.Emscripten.clang


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: Voting
    Testing OnlyOwner
      ✓ onlyOwner must be able to addvoter (966ms) <br>
      ✓ onlyOwner must be able to startVotingSession (132ms)
      ✓ onlyOwner must be able to endVotingSession (112ms)
      ✓ onlyOwner must be able to tallyVotes (114ms)
      ✓ onlyOwner must be able to StartProposalRegistering (92ms)
      ✓ onlyOwner must be able to endProposalsRegistering (102ms)
    Testing OnlyVoter
      ✓ onlyVoters must be able to getVoter
      ✓ onlyVoters must be able to setVote (95ms)
      ✓ onlyVoters must be able to getOneProposal
      ✓ onlyVoters must be able to addProposal (84ms)
    Testing each requirement
      ✓ onlyOwner must add voters only during RegisteringVoters state (170ms)
      ✓ voter must be registered only once (150ms)
      ✓ voter must add proposals only during ProposalsRegistration state (135ms)
      ✓ voter mustnt add empty proposal (240ms)
      ✓ voter must vote only during VotingSession state (141ms)
      ✓ voter must vote only once (554ms)
      ✓ proposal registration must start after registering voters (168ms)
      ✓ end of proposal registration must start after registering proposals (72ms)
      ✓ voting session must start after end of registering proposals (81ms)
      ✓ ending voting session must start during voting session (72ms)
      ✓ tally votes must start after ending voting session (70ms)
    Testing Events
      ✓ must emit VoterRegistered event (193ms)
      ✓ must emit ProposalRegistered event (222ms)
      ✓ must emit Voted event (347ms)
    Testing WorkflowStatus Events 
      ✓ must emit WorkflowStatus event to starting proposal registering (40ms)
      ✓ must emit  WorkflowStatus event to ending proposal registering (38ms)
      ✓ must emit WorkflowStatus event to starting voting session (40ms)
      ✓ must emit WorkflowStatus event to ending voting session (43ms)
      ✓ must emit WorkflowStatus event to count in endingSession (47ms)
    Testing Registering Voter
      ✓ Registering voter (211ms)
    Testing Registering Proposals
      ✓ added proposal in arrayPropo (80ms)
      ✓ added lot of proposal in arrayPropo (607ms)
    Testing State Change
      ✓ must start with RegisteringVoters status
      ✓ must change to ProposalsRegistrationStarted status (63ms)
      ✓ must change to ProposalsRegistrationEnded status (57ms)
      ✓ must change to VotingSessionStarted status (60ms)
      ✓ must change to VotingSessionEnded status (63ms)
    Validation voting phase
      ✓ should save the proposalId that the voter has chosen (179ms)
      ✓ should save Voter has voted or not (73ms)
      ✓ should increment proposal vote count (101ms)
    Validate Tallying phase
      ✓ Should tallyVotes (775ms)


  41 passing (11s)

-------------|----------|----------|----------|----------|----------------|
File         |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------|----------|----------|----------|----------|----------------|
 contracts/  |    94.87 |    89.29 |      100 |    95.12 |                |
  Voting.sol |    94.87 |    89.29 |      100 |    95.12 |        187,188 |
-------------|----------|----------|----------|----------|----------------|
All files    |    94.87 |    89.29 |      100 |    95.12 |                |
-------------|----------|----------|----------|----------|----------------|
