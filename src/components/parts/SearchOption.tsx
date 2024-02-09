interface SearchOptionProps {
  text: string;
  liClasses: string;
  onClickEvent: () => void;
}

const SearchOption: React.FC<SearchOptionProps> = ({ text, liClasses, onClickEvent }) => {
  return (
    <li>
      <button type="button" className={liClasses} onClick={onClickEvent}>
        {text}
      </button>
    </li>
  );
};

export default SearchOption;
