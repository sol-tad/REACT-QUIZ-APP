
// eslint-disable-next-line react/prop-types
function StartScreen({ numQuestions ,dispatch}) {
  return (
    <div>
      <h2>Welcome to The react Quiz~</h2>
      <p>{numQuestions} question to test your React mastery</p>

      <button className="btn btn-ui" onClick={()=>dispatch({type:'start'})} >
    
        Let's start
      </button>
    </div>
  );
}

export default StartScreen
