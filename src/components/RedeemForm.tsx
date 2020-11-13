import React, { useState, useRef } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Spin as SpinAntd,
  Row,
  Col,
} from 'antd';
import {
  LoadingOutlined,
  GlobalOutlined,
  UserOutlined,
  PhoneOutlined,
  FileSearchOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { PublicKey } from '@solana/web3.js';
import { postRedeemForm } from '../utils/network';
import { useWallet } from '../utils/wallet';
import { useTokenAccounts } from '../utils/markets';
import { sendSplToken } from '../utils/send';
import { useConnection } from '../utils/connection';
import { notify } from '../utils/notifications';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  .ant-input {
    color: black;
  }
`;

const StyledInputNumber = styled(InputNumber)`
  .ant-input-number-input {
    color: black;
  }
`;

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
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const connection = useConnection();
  const { wallet } = useWallet();
  const [tokenAccounts] = useTokenAccounts();
  const source = tokenAccounts?.filter(
    (e) => e.effectiveMint.toBase58() === nftMint.toBase58(),
  );

  const emailRef = useRef<string | null>(null);
  const nameRef = useRef<string | null>(null);
  const phoneRef = useRef<string | null>(null);
  const amountRef = useRef(0);
  const countryRef = useRef<string | null>(null);
  const cityRef = useRef<string | null>(null);
  const addressRef = useRef<string | null>(null);
  const postCodeRef = useRef<string | null>(null);
  const additionalRef = useRef<string | null>(null);

  if (!source || source?.length === 0) {
    console.log('Error getting source');
    return null;
  }

  const styles = {
    icon: { color: 'black' },
    label: { color: 'black', fontSize: 16, fontWeight: 700 },
    placeHolder: { color: 'black' },
  };

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const amount = Math.round(amountRef.current);
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

      const postBody = {
        email: emailRef.current,
        name: nameRef.current,
        phone: phoneRef.current,
        amount: amountRef.current,
        country: countryRef.current,
        city: cityRef.current,
        address: addressRef.current,
        postcode: postCodeRef.current,
        'additional-information': additionalRef.current,
        txId: txid,
      };

      await postRedeemForm(postBody);
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
      <Col flex="auto" style={{ color: 'black' }}>
        <Form
          {...layout}
          name="redeem"
          onFinish={onFinish}
          validateMessages={validateMessages}
          style={{ paddingTop: 20, paddingRight: 40, color: 'black' }}
        >
          {step === 1 && (
            <>
              <Form.Item
                name={['user', 'email']}
                label={<div style={styles.label}>Email</div>}
                rules={[
                  {
                    type: 'email',
                    required: true,
                  },
                ]}
                style={styles.icon}
              >
                <StyledInput
                  prefix={<MailOutlined style={styles.icon} />}
                  onChange={(e) => (emailRef.current = e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name={['user', 'name']}
                label={<div style={styles.label}>Name</div>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your name',
                  },
                ]}
              >
                <StyledInput
                  prefix={<UserOutlined style={styles.icon} />}
                  onChange={(e) => (nameRef.current = e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name={['user', 'phone']}
                label={<div style={styles.label}>Phone Number</div>}
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number',
                  },
                ]}
              >
                <StyledInput
                  prefix={<PhoneOutlined style={styles.icon} />}
                  onChange={(e) => (phoneRef.current = e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name={['user', 'amount']}
                label={<div style={styles.label}>Amount to redeem</div>}
                rules={[
                  {
                    required: true,
                    message:
                      'Please enter the amount of token you want to redeem',
                    type: 'number',
                    min: 0,
                    max: 99,
                  },
                ]}
              >
                <StyledInputNumber
                  onChange={(e) => {
                    if (e) {
                      amountRef.current = parseFloat(e.toString());
                    }
                  }}
                />
              </Form.Item>
              <Row align="middle" justify="center">
                <Col flex="auto" />
                <Col>
                  <Button type="primary" onClick={() => setStep(2)}>
                    Next
                  </Button>
                </Col>
                <Col flex="auto" />
              </Row>
            </>
          )}

          {step === 2 && (
            <>
              <Form.Item
                name={['user', 'country']}
                label={<div style={styles.label}>Country</div>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your country',
                  },
                ]}
              >
                <StyledInput
                  prefix={<GlobalOutlined style={styles.icon} />}
                  onChange={(e) => (countryRef.current = e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name={['user', 'City']}
                label={<div style={styles.label}>City</div>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your city',
                  },
                ]}
              >
                <StyledInput
                  prefix={<GlobalOutlined style={styles.icon} />}
                  onChange={(e) => (cityRef.current = e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name={['user', 'address']}
                label={<div style={styles.label}>Address</div>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your address',
                  },
                ]}
              >
                <StyledInput
                  prefix={<GlobalOutlined style={styles.icon} />}
                  onChange={(e) => (addressRef.current = e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name={['user', 'postcode']}
                label={<div style={styles.label}>Postcode</div>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your postcode',
                  },
                ]}
              >
                <StyledInput
                  prefix={<GlobalOutlined style={styles.icon} />}
                  onChange={(e) => (postCodeRef.current = e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name={['user', 'additional-information']}
                label={<div style={styles.label}>Additional information</div>}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <StyledInput
                  onChange={(e) => (additionalRef.current = e.target.value)}
                  prefix={<FileSearchOutlined style={styles.icon} />}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Row align="middle" justify="center">
                  <Col style={{ padding: 10 }}>
                    <Button type="primary" onClick={() => setStep(1)}>
                      Back
                    </Button>
                  </Col>
                  <Col style={{ padding: 10 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={submitting}
                    >
                      {submitting ? <Spin /> : 'Submit'}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </>
          )}
        </Form>
        <Help />
      </Col>
      <Col flex="auto" />
    </Row>
  );
};

const Help = () => {
  const styles = {
    root: {
      textAlign: 'center',
      paddingLeft: 60,
      paddingTop: 20,
    } as React.CSSProperties,
  };
  return (
    <div style={styles.root}>
      If you are having issues redeeming please email{' '}
      <a href="mailto:redeem@solible.com">redeem@solible.com</a>
    </div>
  );
};

export default RedeemForm;
