import {Card} from "antd";

function CryptocurrencyCard(props) {

    const {currency} = props;

    const price = currency.quote.USD.price.toFixed(2);
    const percentChange = currency.quote.USD.percent_change_24h.toFixed(2);
    const marketCap = currency.quote.USD.market_cap;

    function formatNumber(value) {
        if (value >= 1_000_000_000_000) {
            return (value / 1_000_000_000_000).toFixed(2) + ' Trillion';
        } else if (value >= 1_000_000_000) {
            return (value / 1_000_000_000).toFixed(2) + ' Billion';
        } else if (value >= 1_000_000) {
            return (value / 1_000_000).toFixed(2) + ' Million';
        } else {
            return value.toLocaleString(); // fallback for smaller numbers
        }
    }

    const formattedCap = formatNumber(marketCap);

    return (
        <div>
            <Card
                title={
                    <div className="flex items-center gap-3">
                        <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}/>
                        <span>{currency.name}</span>
                    </div>
                }
                style={{
                    width: 400,
                }}
            >
                <p className="text-black">Current price: ${price}</p>
                <p>Price change (24h):{' '}
                    <span className={percentChange >= 0 ? 'text-green-600' : 'text-red-600'}>{percentChange}%</span>
                </p>
                <p className="text-black">Current capitalization: ${formattedCap}</p>

            </Card>
        </div>
    )
}

export default CryptocurrencyCard;