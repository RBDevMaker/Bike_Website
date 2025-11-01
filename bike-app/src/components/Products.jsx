import cassetteImage from '../assets/images/cassette.jpeg'
import crankImage from '../assets/images/crank-arm.jpeg'
import chainImage from '../assets/images/chain.jpeg'
import rainbowBanner from '../assets/images/Rainbow_Banner.svg';

const Products = () => {
    // var company_name="AnyCompany";
    return (
        <div className="products" id="products-link">
        <h2>Products</h2>
        <div className="products-grid" id="products"></div>
            <table width="100%">
                <tr valign="bottom">
                    <td align="center">
                        <img src={cassetteImage} width="130px"/>
                        <p>Cassette $50.00</p>
                    </td>
                    <td align="center">
                        <img src={crankImage} width="130px"/>
                        <p>Crankset $215.00</p>
                    </td>
                    <td align="center">
                        <img src={chainImage} width="130px"/>
                        <p>Chain $35.00</p>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default Products;
