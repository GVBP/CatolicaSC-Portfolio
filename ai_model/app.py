from fastapi import FastAPI
from model import Model

model = Model()
model.initialize()

app = FastAPI()

@app.get('/stock_market/{id_stock_market}')
async def stock_market(id_stock_market:str):
    if( id_stock_market == 'WEGE' ):
        previsoes = model.stock_market_model.predict(model.future)
        return {
            'ticker': id_stock_market,
            'forecast': previsoes['yhat']
        }
    else:
        return {
            'error' : 'Ticker not found'
        }