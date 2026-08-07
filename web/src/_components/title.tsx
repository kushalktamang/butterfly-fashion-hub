interface Title {
  textOne: string;
  textTwo: string;
}

const Title = ({ textOne, textTwo }: Title) => {
  return (
    <>
      <div className="text-center p-5 text-xs">
        <p className="delius">
          <span className="text-pink-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            {textOne}
          </span>{" "}
          <span className="font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl">{textTwo}</span>
        </p>
      </div>
    </>
  );
};

export default Title;
