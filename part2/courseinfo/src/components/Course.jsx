const Header = ({ name }) => <h2>{name}</h2>;
const Contents = ({ parts }) =>
  parts.map((part) => (
    <Part name={part.name} exercises={part.exercises} key={part.id} />
  ));
const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ parts }) => (
  <b>
    <p>
        total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </p>
  </b>  
);
const Course = ({ courses }) => {
  return (
    courses.map(({name,id,parts})=>
    <div key={id}>
      <Header name={name} />
      <Contents parts={parts} />
      <Total parts={parts} />
    </div>
    )
  );
};

export default Course