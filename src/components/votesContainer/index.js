import React, {useState} from 'react'
import { Voters } from "../voters";
import { Parties } from "../parties";

const Votes = () => {
    const [voter_card_no, setVoter_card_no] = useState("");
    const [party, setParty] = useState("");
    const [masterList, setMasterList] = useState([]); //*****Store Votes here for validation*****
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
        // console.log(Party);
        switch (Party)
        {

          case "APC":

            if (masterList.length < 1) 
            {
                masterList.push(votes)
                // console.log(masterList);
                if (party === "APC") {
                  setApcVote([...apcVote, votes]);
                }   
            } 

            else 
            {
              for (let i = 0; i < masterList.length; i += 1) {
                if (masterList.length >= 1 && !(masterList[i].voter_card_no).includes(voter_card_no)) {
                  setMasterList([...masterList, votes])
                  // console.log(masterList[i]);
                  for (let i = 0; i < masterList.length; i += 1) {
                    // console.log(masterList[i].voter_card_no);
                    if (!(masterList[i].voter_card_no).includes(voter_card_no)) {
                      setApcVote([...apcVote, votes]);
                    } 
                    else if((masterList[i].voter_card_no).includes(voter_card_no)) {
                      alert("You can't vote twice")
                      setApcVote([...apcVote]);
                      return false;
                    }
                  } 
                } 
              }
            }

            
            break;

          case "PDP":

            if (masterList.length < 1) 
            { //**** Check if masterList is empty */
                masterList.push(votes)      
                // console.log(masterList);
                if (party === "PDP") {
                  setPdpVote([...pdpVote, votes]);
                } 
            } 

            else 
            {
              for (let i = 0; i < masterList.length; i += 1) 
              {
                if (masterList.length >= 1 && !(masterList[i].voter_card_no).includes(voter_card_no)) {
                  setMasterList([...masterList, votes])
                  // console.log(masterList[i]);
                  for (let i = 0; i < masterList.length; i += 1) {
                    // console.log(masterList[i].voter_card_no);
                    if (!(masterList[i].voter_card_no).includes(voter_card_no)) {  
                      setPdpVote([...pdpVote, votes]);
                    } 
                    else if((masterList[i].voter_card_no).includes(voter_card_no)) {
                      alert("You can't vote twice")
                      setPdpVote([...pdpVote]);
                      return false;
                    }
                  }     
                } 
              }
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