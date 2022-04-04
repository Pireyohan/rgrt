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

  **Contract: Voting**<br>
                   **Testing OnlyOwner** <br>
      ✓ onlyOwner must be able to addvoter (966ms) <br>
      ✓ onlyOwner must be able to startVotingSession (132ms) <br>
      ✓ onlyOwner must be able to endVotingSession (112ms) <br>
      ✓ onlyOwner must be able to tallyVotes (114ms) <br>
      ✓ onlyOwner must be able to StartProposalRegistering (92ms)  <br>
      ✓ onlyOwner must be able to endProposalsRegistering (102ms)    <br>
                    **Testing OnlyVoter**<br>
      ✓ onlyVoters must be able to getVoter <br>
      ✓ onlyVoters must be able to setVote (95ms) <br>
      ✓ onlyVoters must be able to getOneProposal <br>
      ✓ onlyVoters must be able to addProposal (84ms) <br>
                    **Testing each requirement**  <br>
      ✓ onlyOwner must add voters only during RegisteringVoters state (170ms)  <br>
      ✓ voter must be registered only once (150ms)  <br>
      ✓ voter must add proposals only during ProposalsRegistration state (135ms)  <br>
      ✓ voter mustnt add empty proposal (240ms)  <br>
      ✓ voter must vote only during VotingSession state (141ms)  <br>
      ✓ voter must vote only once (554ms) <br>
      ✓ proposal registration must start after registering voters (168ms) <br>
      ✓ end of proposal registration must start after registering proposals (72ms) <br>
      ✓ voting session must start after end of registering proposals (81ms) <br>
      ✓ ending voting session must start during voting session (72ms) <br>
      ✓ tally votes must start after ending voting session (70ms) <br>
                     **Testing Events** <br>
      ✓ must emit VoterRegistered event (193ms) <br>
      ✓ must emit ProposalRegistered event (222ms) <br>
      ✓ must emit Voted event (347ms) <br>
                     **Testing WorkflowStatus Events**  <br>
      ✓ must emit WorkflowStatus event to starting proposal registering (40ms) <br>
      ✓ must emit  WorkflowStatus event to ending proposal registering (38ms) <br>
      ✓ must emit WorkflowStatus event to starting voting session (40ms) <br>
      ✓ must emit WorkflowStatus event to ending voting session (43ms) <br>
      ✓ must emit WorkflowStatus event to count in endingSession (47ms) <br>
                     **Testing Registering Voter** <br>
      ✓ Registering voter (211ms) <br>
                     **Testing Registering Proposals** <br>
      ✓ added proposal in arrayPropo (80ms) <br>
      ✓ added lot of proposal in arrayPropo (607ms) <br>
                     **Testing State Change** <br>
      ✓ must start with RegisteringVoters status <br>
      ✓ must change to ProposalsRegistrationStarted status (63ms) <br>
      ✓ must change to ProposalsRegistrationEnded status (57ms) <br>
      ✓ must change to VotingSessionStarted status (60ms) <br>
      ✓ must change to VotingSessionEnded status (63ms) <br>
                    **Validation voting phase** <br>
      ✓ should save the proposalId that the voter has chosen (179ms) <br>
      ✓ should save Voter has voted or not (73ms) <br>
      ✓ should increment proposal vote count (101ms) <br>
                    **Validate Tallying phase** <br>
      ✓ Should tallyVotes (775ms) <br>


  41 passing (11s) <br>

-------------|----------|----------|----------|----------|----------------|
File         |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------|----------|----------|----------|----------|----------------|
 contracts/  |    94.87 |    89.29 |      100 |    95.12 |                |
  Voting.sol |    94.87 |    89.29 |      100 |    95.12 |        187,188 |
-------------|----------|----------|----------|----------|----------------|
All files    |    94.87 |    89.29 |      100 |    95.12 |                |
-------------|----------|----------|----------|----------|----------------|
