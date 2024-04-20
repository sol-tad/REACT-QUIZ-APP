
// eslint-disable-next-line react/prop-types
function StartScreen({ numQuestions }) {
  return (
    <div>
      <h2>Welcome to The react Quiz~</h2>
      <p>{numQuestions} question to test your React mastery</p>

      <button className="btn btn-ui"> Let's start</button>
    </div>
  );
}

export default StartScreen
