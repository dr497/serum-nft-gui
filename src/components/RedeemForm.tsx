import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Spin as SpinAntd,
  Row,
  Col,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { PublicKey } from '@solana/web3.js';
import { postRedeemForm } from '../utils/network';
import { useWallet } from '../utils/wallet';
import { useTokenAccounts } from '../utils/markets';
import { sendSplToken } from '../utils/send';
import { useConnection } from '../utils/connection';
import { notify } from '../utils/notifications';

const Spin = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return <SpinAntd indicator={antIcon} />;
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const RedeemForm = ({
  nftMint,
  destination,
}: {
  nftMint: PublicKey;
  destination: PublicKey;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const connection = useConnection();
  const { wallet } = useWallet();
  const [tokenAccounts] = useTokenAccounts();
  const source = tokenAccounts?.filter(
    (e) => e.effectiveMint.toBase58() === nftMint.toBase58(),
  );
  if (!source || source?.length === 0) {
    console.log('Error getting source');
    return null;
  }

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const amount = Math.round(parseFloat(values.user.amount));
      if (!amount || amount <= 0) {
        throw new Error('Invalid amount');
      }
      const txid = await sendSplToken({
        connection: connection,
        owner: wallet.publicKey,
        sourceSpl: source[0]?.pubkey,
        destination: destination,
        amount: amount,
        wallet: wallet,
      });
      await postRedeemForm({ ...values.user, txId: txid });
      notify({ message: 'Redeem request successful', type: 'success', txid });
    } catch (err) {
      console.log(`Error redeeming: ${err}`);
      notify({
        message: 'Error redeeming',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Row>
      <Col flex="auto" />
      <Col flex="800px">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          style={{ paddingTop: 20, paddingRight: 40 }}
        >
          <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'name']}
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please enter your name',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'phone']}
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'country']}
            label="Country"
            rules={[
              {
                required: true,
                message: 'Please enter your country',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'City']}
            label="City"
            rules={[
              {
                required: true,
                message: 'Please enter your city',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'address']}
            label="Address"
            rules={[
              {
                required: true,
                message: 'Please enter your address',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'postcode']}
            label="Postcode"
            rules={[
              {
                required: true,
                message: 'Please enter your postcode',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'additional-information']}
            label="Additional information"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'amount']}
            label="Amount to redeem"
            rules={[
              {
                required: true,
                message: 'Please enter the amount of token you want to redeem',
                type: 'number',
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" disabled={submitting}>
              {submitting ? <Spin /> : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
        <Help />
      </Col>
      <Col flex="auto" />
    </Row>
  );
};

const Help = () => {
  const styles = {
    root: { textAlign: 'center', paddingLeft: 60 } as React.CSSProperties,
  };
  return (
    <div style={styles.root}>
      If you are having issues redeeming please email{' '}
      <a href="mailto:redeem@solible.com">redeem@solible.com</a>
    </div>
  );
};

export default RedeemForm;
