import Layout from "../components/Main/Layout";
import "../style/index.css";
import { wrapper } from "../store";
import { Provider } from "react-redux";

export default function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
