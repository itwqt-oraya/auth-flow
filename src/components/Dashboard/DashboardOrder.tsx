import {Input} from 'reactstrap';
export default function DashboardOrder({
  changeOrder,
}: {
  changeOrder: (order: string) => void;
}) {
  return (
    <div>
      <Input
        bsSize="sm"
        className="mb-3"
        type="select"
        onChange={(e) => {
          changeOrder(e.target.value);
        }}
      >
        <option value="DESC">Newest</option>
        <option value="ASC">Oldest</option>
      </Input>
    </div>
  );
}
