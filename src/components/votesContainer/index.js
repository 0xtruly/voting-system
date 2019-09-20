import React, {useState} from 'react'
import { Voters } from "../voters";
import { Parties } from "../parties";

const Votes = () => {
    const [voter_card_no, setVoter_card_no] = useState("");
    const [party, setParty] = useState("");
    const [master, setMaster] = useState([]);
    const [apcVote, setApcVote] = useState([]);
    const [pdpVote, setPdpVote] = useState([]);

    const handleCardNo = e =>
    {
        setVoter_card_no(e.target.value);
    };
      // ..................................................................
      // Select user voter_card_no
    const handleParty = e =>
    {
        setParty(e.target.value);
    };
      // ....................................................................
      //  make submission
    
    const submission = e =>
    {
        e.preventDefault();
    
        const votes =
        {
          voter_card_no: voter_card_no,
          party: party
        };

        let Party = party;
        switch (Party)
        {

          case "APC":
            if (master.length <= 1) {
              setApcVote([...apcVote, votes]);
              setMaster([...master, votes]);
            } else {
              master.map(apc =>  {
                console.log(apc);
                if (apc.voter_card_no === voter_card_no) {
                  alert("Already voted");
                  return false;
                } else {
                  setApcVote([...apcVote, votes]);
                }
              });
            }
    
            break;
            
          case "PDP":
            if (master.length <= 1) {
              setPdpVote([...pdpVote, votes]);
              setMaster([...master, votes]);
            } else {
              master.map(pdp => {
                if (pdp.voter_card_no === voter_card_no) {
                  alert("Already voted");
                  return false;
                } else {
                  setPdpVote([...pdpVote, votes]);
                }
              });
            }
    
            break;
    
          default:
            break;
        }
    };

      return(
          <div>
            <form>
                <div className="form-group">
                    <label htmlFor="votersName">Voters Name:</label>
                    <select onChange={handleCardNo}>
                            <option>[----select Voter----]</option>
                            {Voters.map(vote => (
                              <option value={vote.voter_card_no} key={vote.voter_card_no}>
                                {vote.voter_name}
                              </option>
                            ))}
                    </select>

                    <label htmlFor="votersCardNo">Select Party</label>
                    <select onChange={handleParty}>
                            <option>[----select Party----]</option>
                            {Parties.map(party => (
                              <option value={party.party} key={party.id}>
                                {party.party}
                              </option>
                            ))}
                    </select>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={submission}
                    >
                      Submit
                    </button>
                </div>
            </form>
            <div className="vote_count">
              <div className="apc_vote_count">
                <label htmlFor="apc_vote_count">APC:</label>
                <div>{apcVote.length}</div>
              </div>
              <div className="apc_vote_count">
                <label htmlFor="apc_vote_count">PDP:</label>
                <div>{pdpVote.length}</div>
              </div>
            </div>
          </div>
      )
}

export default Votes;