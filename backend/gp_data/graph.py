import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from models import GasPrice

def create_plot():
    all_prices = GasPrice.query.order_by(GasPrice.date.desc()).limit(10).all()
    all_prices.reverse() 
    
    dates = [price.date for price in all_prices]
    regular_prices = [price.regular for price in all_prices]
    premium_prices = [price.premium for price in all_prices]
    diesel_prices = [price.diesel for price in all_prices]

    plt.figure(figsize=(4, 4))
    plt.plot(dates, regular_prices, label='Regular')
    plt.plot(dates, premium_prices, label='Premium')
    plt.plot(dates, diesel_prices, label='Diesel')
    plt.xlabel('Date')
    plt.ylabel('Price')
    plt.title('Gas Prices Over Time')
    plt.legend()

    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=1))  
    plt.gcf().autofmt_xdate()  
    plt.xticks(rotation=40, ha='right', fontsize=7)  

    plt.tight_layout()

    plt.savefig('/Users/farzinshifat/webpage/backend/gp_data/static/gas_prices_plot.png')
    plt.close()

   
