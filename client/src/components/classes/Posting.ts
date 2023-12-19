class Posting {
  constructor(
    public _id: string,
    public type: "buy" | "sell",
    public title: string,
    public desc: string,
    public price: number,
    public imageSrc: string[],
    public userId: string
  ) {}
}

export default Posting;
