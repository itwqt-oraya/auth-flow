import {Input} from 'reactstrap';
export default function DashboardOrder({
  onChangeQuery,
}: {
  onChangeQuery: (offset: number, order: string) => void;
}) {
  return (
    <div>
      <Input
        bsSize="sm"
        className="mb-3"
        type="select"
        onChange={(e) => {
          onChangeQuery(0, e.target.value);
        }}
      >
        <option value="DESC">Newest</option>
        <option value="ASC">Oldest</option>
      </Input>
    </div>
  );
}
