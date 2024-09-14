import pandas as pd
import yfinance as yf

from prophet import Prophet
from singleton_decorator import singleton

@singleton
class Model:

    stock_market_model = None
    future = None

    def initialize(self):
        #acao_df = pd.DataFrame()
        #acao_df['WEGE3.SA'] = yf.download(tickers='WEGE3.SA', period='5Y')['Close']
        #acao_df = acao_df.rename(columns={'WEGE3.SA': 'WEGE'})
        acao_df = pd.read_csv('acao.csv', usecols = ['Date', 'WEGE'])
        acao_df.dropna(inplace=True)
        self.stock_market_model = self.prepare(acao_df)
        self.future = self.stock_market_model.make_future_dataframe(periods=90)

    def prepare(self, df):
        dataset = df[['Date', 'WEGE']].rename(columns = {'Date': 'ds', 'WEGE': 'y'})
        modelo = Prophet(interval_width=0.9, changepoint_prior_scale=0.2)
        modelo.fit(dataset)
        return modelo
