import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

const FeaturedInfo= ()=> {

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">ventas</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$15000</span>
          <span className="featuredMoneyRate">
          -11.4 <ArrowDownward className="featuredIcon negative" />
            {/* %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )} */}
          </span>
        </div>
        <span className="featuredSub">comparado con el mes anterior</span>
      </div>
    </div>
  );
}


export default FeaturedInfo 
