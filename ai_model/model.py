import pandas as pd # type: ignore
import yfinance as yf # type: ignore

from prophet import Prophet # type: ignore
from singleton_decorator import singleton # type: ignore

@singleton
class Model:

    stock_market_model = None
    future = None

    def initialize(self):
        acao_df = yf.download(tickers='WEGE3.SA', period='2Y')
        self.stock_market_model = self.prepare(acao_df)
        self.future = self.stock_market_model.make_future_dataframe(periods=90)

    def prepare(self, df):
        target_df = df['Close']
        target_df = target_df.reset_index('Date')
        target_df.columns = ['ds', 'y']
        model = Prophet(interval_width=0.9, changepoint_prior_scale=0.2)
        model.fit(target_df)
        return model
