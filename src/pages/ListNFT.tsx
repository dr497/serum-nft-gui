import React, { useState } from 'react';
import {
  Typography,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Upload,
  Select,
  Button,
} from 'antd';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { notify } from '../utils/notifications';
import { postMintToken } from '../utils/network';
import { TokenMintReq } from '../utils/types';
import { useWallet, WALLET_PROVIDERS } from '../utils/wallet';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Emoji from '../components/Emoji';

const { Title } = Typography;

// todo: set env to github pages
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const AWS_S3_BUCKET_REGION = process.env.AWS_S3_BUCKET_REGION;
const AWS_S3_BUCKET_POOL_ID = process.env.AWS_S3_BUCKET_POOL_ID;

AWS.config.update({
  region: AWS_S3_BUCKET_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWS_S3_BUCKET_POOL_ID,
  }),
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {
    Bucket: AWS_S3_BUCKET_NAME,
  },
});

const allowedAssetTypes = [
  'image/gif',
  'image/bmp',
  'image/jpeg',
  'image/png',
  'video/webm',
  'image/svg+xml',
  'video/mp4',
];
const videoSuffixes = ['mp4', 'webm'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const styles = {
  title: {
    color: 'white',
    fontFamily: 'Source Sans Pro',
    paddingTop: 15,
    paddingRight: 10,
  },
  form: {
    paddingTop: 32,
    fontSize: '16px',
    fontWeight: 'bold',
  } as React.CSSProperties,
  preview: {
    width: '100%',
  } as React.CSSProperties,
  walletConnectButton: {
    marginLeft: 16,
  },
};

const formLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 32,
  },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 32 },
};

const BookEmoji = <Emoji symbol="🛠" label="book" class="emoji-list-book" />;

// check a s3 url if file type is listed in videoSuffixes
const isVideo = (url): boolean => {
  return videoSuffixes.indexOf(url.split('.').slice(-1)[0].toLowerCase()) > -1
    ? true
    : false;
};

const AssetUpload = (props) => {
  const [loading, setLoading] = useState(false);
  const { assetUrl, setHandle } = props;

  // check file type and size
  const beforeUpload = (file): boolean => {
    const isAllowedType = allowedAssetTypes.indexOf(file.type) > -1;
    const isAllowedSize = file.size < MAX_FILE_SIZE;
    return isAllowedType && isAllowedSize;
  };

  // custom xhr upload function for aws s3
  const handleUpload = async (e) => {
    setLoading(true);
    // generate a uuid for the asset
    let uuid = uuidv4();
    // append file type suffix to form a key
    let key = uuid + '.' + e.file.name.split('.').slice(-1);
    // upload
    try {
      let res = await s3
        .upload({
          Bucket: AWS_S3_BUCKET_NAME,
          Key: key,
          Body: e.file,
          ACL: 'public-read', // note IAM policy needs to enable PutObjectAcl permission
        })
        .promise();
      setHandle(res.Location);
    } catch (error) {
      notify({
        message: 'Upload asset file error',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      <p>{assetUrl}</p>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="asset"
      listType="picture-card"
      accept={allowedAssetTypes.join(',')}
      action={assetUrl}
      beforeUpload={beforeUpload}
      customRequest={handleUpload}
      multiple={false}
      showUploadList={false}
    >
      {assetUrl && isVideo(assetUrl) && (
        <video muted loop autoPlay playsInline style={styles.preview}>
          <source src={assetUrl} type="video/mp4" />
        </video>
      )}
      {assetUrl && !isVideo(assetUrl) && (
        <img src={assetUrl} alt="digital-asset" style={styles.preview} />
      )}
      {!assetUrl && uploadButton}
    </Upload>
  );
};

const ListForm = (props) => {
  const { wallet } = props;
  const [form] = Form.useForm();
  const [assetUrl, setAssetUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    // mint token
    let req: TokenMintReq = {
      publicKey: wallet.publicKey.toString(),
      supply: values.supply,
      decimals: 0, // nft, not fungible
    };

    try {
      let res = await postMintToken(req);
      if (res && res.success) {
        // todo: save data to DB
        // res.data.tokenMint
        // redirect to my collection
      } else {
        throw new Error('Mint API returns error');
      }
    } catch (error) {
      console.log(error);
      notify({
        message: 'Token mint error',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const setUploadedUrl = (url) => {
    setAssetUrl(url);
    form.setFieldsValue({ assetUrl: url });
  };

  return (
    <Form
      form={form}
      {...formLayout}
      style={styles.form}
      name="list-nft"
      initialValues={{ tokenName: '', supply: 1, assetUrl: '' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Token Name"
        name="tokenName"
        rules={[
          {
            required: true,
            message: 'Token name required',
          },
          {
            max: 255,
            message: 'Token name too long',
          },
          {
            pattern: new RegExp('^[a-zA-Z0-9_.-]+( [a-zA-Z0-9_.-]+)*$'),
            message: 'Only letters, numbers, ., -, _, and spaces allowed',
          },
        ]}
      >
        <Input placeholder="Awesome Token Name" />
      </Form.Item>
      <Form.Item
        label="supply"
        name="supply"
        rules={[
          {
            required: true,
            message: 'Token supply required',
          },
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        label="Digital Asset"
        name="assetUrl"
        rules={[
          {
            required: true,
            message: 'Please upload your digital asset',
          },
        ]}
      >
        <AssetUpload assetUrl={assetUrl} setHandle={setUploadedUrl} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button loading={loading} size="large" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const ListNFT = () => {
  const { connected, wallet, setProvider, providerUrl } = useWallet();
  return (
    <Row style={{ marginTop: 32 }} align="middle" justify="center">
      <Col flex="auto" />
      <Col>
        <Row align="middle" justify="center">
          <Col>
            <Title level={1} style={styles.title}>
              List your NFT on Solible
            </Title>
          </Col>
          <Col>{BookEmoji}</Col>
        </Row>
        {connected ? (
          <>
            <ListForm wallet={wallet} />
          </>
        ) : (
          <Row justify="center" style={{ marginTop: 128 }}>
            <Select size="large" onSelect={setProvider} value={providerUrl}>
              {WALLET_PROVIDERS.map(({ name, url }) => (
                <Select.Option value={url} key={url}>
                  {name}
                </Select.Option>
              ))}
            </Select>
            <Button
              style={styles.walletConnectButton}
              size="large"
              type="primary"
              onClick={wallet.connect}
            >
              Connect wallet
            </Button>
          </Row>
        )}
      </Col>
      <Col flex="auto" />
    </Row>
  );
};

export default ListNFT;
