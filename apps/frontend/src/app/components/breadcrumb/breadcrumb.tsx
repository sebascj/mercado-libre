import './breadcrumb.scss';
type Props = {
  path: string[];
};

const BreadCrumb = ({ path }: Props) => {
  return (
    <div className="breadcrumb">
      {path.map((category, index) => {
        return (
          <span key={'breadcrumb_' + index} className="breadcrumb__category">
            {category}
          </span>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
