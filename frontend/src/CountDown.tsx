type CountDownProps = {
  countdown: number[];
};

const CountDown = ({ countdown }: CountDownProps) => {
  return (
    <h1 className="text-3xl mb-2">
      Countdown: {countdown[0]} days {countdown[1]} hours {countdown[2]} minutes{" "}
      {countdown[3]} seconds left
    </h1>
  );
};

export default CountDown;
