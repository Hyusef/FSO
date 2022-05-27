const Content = ({ courseParts }: { courseParts: any }) => {
console.log(courseParts);
  return <div>
    <p>{courseParts[0].name}</p>
    <p>{courseParts[1].name}</p>
    <p>{courseParts[2].name}</p>
  </div>;
};

export default Content;
