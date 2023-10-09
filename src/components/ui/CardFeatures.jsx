import { Button } from "./Button";

export const CardFeatures = ({ i }) => {
  const { title, desc, value } = i;
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8">
      <div className="flex flex-col gap-3">
        <p className="text-center text- font-bold text-primary">{title}</p>
        <p className="text-center text-base">{desc}</p>
      </div>
      <Button
        texto={value}
        href={"#"}
        cssPersonalizado={
          "bg-secondary font-bold px-3 py-3 text-lg text-five rounded-full text-center text-semibold shadow-md shadow-black/10 cursor-pointer hover:translate-x-[1.03] transition-all ease-in-out w-full duration-300"
        }
      />
    </div>
  );
};
