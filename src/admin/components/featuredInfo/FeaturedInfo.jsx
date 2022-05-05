import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

const FeaturedInfo= ({ allPayingSum })=> {

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Ventas totales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{allPayingSum ? `$ ${allPayingSum}` : `Aun no hay ventas realizadas`}</span>
        </div>
        {/* <span className="featuredSub">comparado con el mes anterior</span> */}
      </div>
    </div>
  );
}


export default FeaturedInfo 
