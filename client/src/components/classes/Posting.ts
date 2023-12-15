class Posting {
  constructor(
    public _id: string,
    public title: string,
    public desc: string,
    public price: number,
    public imageSrc: string[],
    public userId: string
  ) {}
}

export default Posting;
