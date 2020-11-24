import { Button, Input, Radio } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  useSelectedBaseCurrencyBalances,
  useSelectedQuoteCurrencyBalances,
  useMarket,
  useMarkPrice,
  useSelectedOpenOrdersAccount,
  useSelectedBaseCurrencyAccount,
  useSelectedQuoteCurrencyAccount,
} from '../utils/markets';
import { useWallet } from '../utils/wallet';
import { notify } from '../utils/notifications';
import {
  getDecimalCount,
  roundToDecimal,
  floorToDecimal,
} from '../utils/utils';
import { useSendConnection } from '../utils/connection';
import FloatingElement from './layout/FloatingElement';
import { placeOrder } from '../utils/send';
import { USE_ALL_NFTS } from '../nfts';
import { DISABLE_SELL, PUBLIC_KEY_GOD } from '../nfts/utils';

const SellButton = styled(Button)`
  margin: 20px 0px 0px 0px;
  background: #f23b69;
  border-color: #f23b69;
  &:hover {
    background: #000;
    border-color: #000;
    color: #f23b69;
    border: solid 2px;
  }
`;

const BuyButton = styled(Button)`
  margin: 20px 0px 0px 0px;
  background: #02bf76;
  border-color: #02bf76;
  &:hover {
    background: #000;
    border-color: #000;
    color: #02bf76;
    border: solid 2px;
  }
`;

export default function TradeForm({
  style,
  setChangeOrderRef,
}: {
  style?: any;
  setChangeOrderRef?: (
    ref: ({ size, price }: { size?: number; price?: number }) => void,
  ) => void;
}) {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const { baseCurrency, quoteCurrency, market } = useMarket();
  const baseCurrencyBalances = useSelectedBaseCurrencyBalances();
  const quoteCurrencyBalances = useSelectedQuoteCurrencyBalances();
  const baseCurrencyAccount = useSelectedBaseCurrencyAccount();
  const quoteCurrencyAccount = useSelectedQuoteCurrencyAccount();
  const openOrdersAccount = useSelectedOpenOrdersAccount(true);
  const { wallet, connected } = useWallet();
  const sendConnection = useSendConnection();
  const markPrice = useMarkPrice();

  const [postOnly] = useState(false);
  const [ioc] = useState(false);
  const [baseSize, setBaseSize] = useState<number | undefined>(undefined);
  const [quoteSize, setQuoteSize] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [sizeFraction, setSizeFraction] = useState(0);

  const [cannotSell, setCannotSell] = useState(false);

  let NFT: any;
  if (market) {
    NFT = USE_ALL_NFTS.filter(
      (nft) => nft.marketAddress.toBase58() === market.address.toBase58(),
    )[0];
  }

  useEffect(() => {
    if (market && connected) {
      setCannotSell(
        // @ts-ignore
        DISABLE_SELL.includes(market.address.toBase58()) &&
          wallet.publicKey.toBase58() != PUBLIC_KEY_GOD,
      );
    }
  }, [wallet, market, connected, price, baseSize, quoteSize, side]);

  const availableQuote =
    openOrdersAccount && market
      ? market.quoteSplSizeToNumber(openOrdersAccount.quoteTokenFree)
      : 0;

  let quoteBalance = (quoteCurrencyBalances || 0) + (availableQuote || 0);
  let baseBalance = baseCurrencyBalances || 0;
  let sizeDecimalCount =
    market?.minOrderSize && getDecimalCount(market.minOrderSize);
  let priceDecimalCount = market?.tickSize && getDecimalCount(market.tickSize);

  useEffect(() => {
    setChangeOrderRef && setChangeOrderRef(doChangeOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setChangeOrderRef]);

  useEffect(() => {
    baseSize && price && onSliderChange(sizeFraction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side]);

  useEffect(() => {
    updateSizeFraction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, baseSize]);

  const onSetBaseSize = (baseSize: number | undefined) => {
    setBaseSize(baseSize);
    if (!baseSize) {
      setQuoteSize(undefined);
      return;
    }
    let usePrice = price || markPrice;
    if (!usePrice) {
      setQuoteSize(undefined);
      return;
    }
    const rawQuoteSize = baseSize * usePrice;
    const quoteSize =
      baseSize && roundToDecimal(rawQuoteSize, sizeDecimalCount);
    setQuoteSize(quoteSize);
  };

  const onSetQuoteSize = (quoteSize: number | undefined) => {
    setQuoteSize(quoteSize);
    if (!quoteSize) {
      setBaseSize(undefined);
      return;
    }
    let usePrice = price || markPrice;
    if (!usePrice) {
      setBaseSize(undefined);
      return;
    }
    const rawBaseSize = quoteSize / usePrice;
    const baseSize = quoteSize && roundToDecimal(rawBaseSize, sizeDecimalCount);
    setBaseSize(baseSize);
  };

  const doChangeOrder = ({
    size,
    price,
  }: {
    size?: number;
    price?: number;
  }) => {
    const formattedSize = size && roundToDecimal(size, sizeDecimalCount);
    const formattedPrice = price && roundToDecimal(price, priceDecimalCount);
    formattedSize && onSetBaseSize(formattedSize);
    formattedPrice && setPrice(formattedPrice);
  };

  const updateSizeFraction = () => {
    const rawMaxSize =
      side === 'buy' ? quoteBalance / (price || markPrice || 1) : baseBalance;
    const maxSize = floorToDecimal(rawMaxSize, sizeDecimalCount);
    const sizeFraction = Math.min(((baseSize || 0) / maxSize) * 100, 100);
    setSizeFraction(sizeFraction);
  };

  const onSliderChange = (value) => {
    if (!price && markPrice) {
      let formattedMarkPrice: number | string = priceDecimalCount
        ? markPrice.toFixed(priceDecimalCount)
        : markPrice;
      setPrice(
        typeof formattedMarkPrice === 'number'
          ? formattedMarkPrice
          : parseFloat(formattedMarkPrice),
      );
    }

    let newSize;
    if (side === 'buy') {
      if (price || markPrice) {
        newSize = ((quoteBalance / (price || markPrice || 1)) * value) / 100;
      }
    } else {
      newSize = (baseBalance * value) / 100;
    }

    // round down to minOrderSize increment
    let formatted = floorToDecimal(newSize, sizeDecimalCount);

    onSetBaseSize(formatted);
  };

  async function onSubmit() {
    if (!price) {
      console.warn('Missing price');
      notify({
        message: 'Missing price',
        type: 'error',
      });
      return;
    } else if (!baseSize) {
      console.warn('Missing size');
      notify({
        message: 'Missing size',
        type: 'error',
      });
      return;
    }

    setSubmitting(true);
    try {
      await placeOrder({
        side,
        price,
        size: baseSize,
        orderType: ioc ? 'ioc' : postOnly ? 'postOnly' : 'limit',
        market,
        connection: sendConnection,
        wallet,
        baseCurrencyAccount: baseCurrencyAccount?.pubkey,
        quoteCurrencyAccount: quoteCurrencyAccount?.pubkey,
      });
      setPrice(undefined);
      onSetBaseSize(undefined);
    } catch (e) {
      console.warn(e);
      notify({
        message: 'Error placing order',
        description: e.message,
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FloatingElement
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        // borderRadius: '25px',
        // border: 'solid 3px',
        ...style,
      }}
    >
      <div style={{ flex: 1 }}>
        <Radio.Group
          onChange={(e) => setSide(e.target.value)}
          value={side}
          buttonStyle="solid"
          style={{
            marginBottom: 8,
            width: '100%',
          }}
        >
          <Radio.Button
            value="buy"
            style={{
              width: '50%',
              textAlign: 'center',
              background: side === 'buy' ? '#02bf76' : '',
              borderColor: side === 'buy' ? '#02bf76' : '',
            }}
          >
            BUY
          </Radio.Button>
          <Radio.Button
            disabled={cannotSell}
            value="sell"
            style={{
              width: '50%',
              textAlign: 'center',
              background: side === 'sell' ? '#F23B69' : '',
              borderColor: side === 'sell' ? '#F23B69' : '',
            }}
          >
            SELL
          </Radio.Button>
        </Radio.Group>
        <Input
          style={{ textAlign: 'right', paddingBottom: 8 }}
          addonBefore={<div style={{ width: '30px' }}>Price</div>}
          suffix={
            <span style={{ fontSize: 10, opacity: 0.5 }}>{quoteCurrency}</span>
          }
          value={price}
          type="number"
          step={market?.tickSize || 1}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <Input.Group compact style={{ paddingBottom: 8 }}>
          <Input
            style={{ width: 'calc(50% + 30px)', textAlign: 'right' }}
            addonBefore={<div style={{ width: '30px' }}>Size</div>}
            suffix={
              <span style={{ fontSize: 10, opacity: 0.5 }}>
                {baseCurrency === 'UNKNOWN' && market
                  ? NFT?.name
                  : baseCurrency}
              </span>
            }
            value={baseSize}
            type="number"
            step={market?.minOrderSize || 1}
            onChange={(e) => onSetBaseSize(parseFloat(e.target.value))}
          />
          <Input
            style={{ width: 'calc(50% - 30px)', textAlign: 'right' }}
            suffix={
              <span style={{ fontSize: 10, opacity: 0.5 }}>
                {quoteCurrency}
              </span>
            }
            value={quoteSize}
            type="number"
            step={market?.minOrderSize || 1}
            onChange={(e) => onSetQuoteSize(parseFloat(e.target.value))}
          />
        </Input.Group>
      </div>
      {side === 'buy' ? (
        <BuyButton
          disabled={!price || !baseSize}
          onClick={onSubmit}
          block
          type="primary"
          size="large"
          loading={submitting}
        >
          Buy {baseCurrency === 'UNKNOWN' && market ? NFT?.name : baseCurrency}
        </BuyButton>
      ) : (
        <SellButton
          disabled={!price || !baseSize || cannotSell}
          onClick={onSubmit}
          block
          type="primary"
          size="large"
          loading={submitting}
        >
          Sell {baseCurrency === 'UNKNOWN' && market ? NFT?.name : baseCurrency}
        </SellButton>
      )}
    </FloatingElement>
  );
}
