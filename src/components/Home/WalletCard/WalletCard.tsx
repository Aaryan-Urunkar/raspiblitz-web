import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import btcLogo from "../../../assets/bitcoin-circle-white.svg";
import { ReactComponent as ChainIcon } from "../../../assets/chain.svg";
import { ReactComponent as LightningIcon } from "../../../assets/lightning.svg";
import { ReactComponent as ReceiveIcon } from "../../../assets/receive.svg";
import { ReactComponent as SendIcon } from "../../../assets/send.svg";
import { AppContext, Unit } from "../../../store/app-context";
import {
  convertMSatToBtc,
  convertSatToBtc,
  convertToString,
} from "../../../util/format";
import { checkPropsUndefined } from "../../../util/util";
import LoadingBox from "../../Shared/LoadingBox/LoadingBox";

export const WalletCard: FC<WalletCardProps> = (props) => {
  const { t } = useTranslation();
  const { unit } = useContext(AppContext);

  if (checkPropsUndefined(props)) {
    return <LoadingBox />;
  }

  const { onchainBalance, lnBalance } = props;

  const convertedOnchainBalance =
    unit === Unit.BTC ? convertSatToBtc(onchainBalance) : onchainBalance;
  const convertedLnBalance =
    unit === Unit.BTC ? convertMSatToBtc(lnBalance) : lnBalance / 1000;

  const totalBalance =
    unit === Unit.BTC
      ? +(convertedOnchainBalance + convertedLnBalance).toFixed(8)
      : convertedOnchainBalance + convertedLnBalance;

  return (
    <div className="h-full p-5">
      <div className="bd-card h-full transition-colors">
        <section className="flex flex-col flex-wrap p-5 text-black lg:flex-row">
          <div className="relative w-full overflow-hidden rounded-xl bg-yellow-600 bg-gradient-to-b from-yellow-500 p-4 text-white">
            <article className="flex w-full flex-col">
              <h6 className="text-xl">{t("wallet.balance")}</h6>
              <p className="text-2xl font-bold">
                {convertToString(unit, totalBalance)} {unit}
              </p>
            </article>
            <article className="flex w-full flex-col">
              <h6>
                <ChainIcon className="inline h-5 w-5" />
                &nbsp;{t("wallet.on_chain")}
              </h6>
              <p className="text-lg font-bold">
                {convertToString(unit, convertedOnchainBalance)} {unit}
              </p>
            </article>
            <article className="flex w-full flex-col">
              <h6>
                <LightningIcon className="inline h-5 w-5" />
                &nbsp;{t("home.lightning")}
              </h6>
              <p className="text-lg font-bold">
                {convertToString(unit, convertedLnBalance)} {unit}
              </p>
            </article>
            <img
              src={btcLogo}
              className="absolute -bottom-9 -right-9 h-32 w-32 opacity-30"
              alt="Bitcoin Logo"
            />
          </div>
        </section>
        <section className="flex justify-around p-2">
          <button
            onClick={props.onReceive}
            className="flex h-10 w-5/12 items-center justify-center rounded bg-black p-3 text-white hover:bg-gray-700"
          >
            <ReceiveIcon className="h-6 w-6" />
            <span>&nbsp;{t("wallet.receive")}</span>
          </button>
          <button
            onClick={props.onSend}
            className="flex h-10 w-5/12 items-center justify-center rounded bg-black p-3 text-white hover:bg-gray-700"
          >
            <SendIcon className="h-6 w-6" />
            <span>&nbsp;{t("wallet.send")}</span>
          </button>
        </section>
      </div>
    </div>
  );
};

export default WalletCard;

export interface WalletCardProps {
  onchainBalance: number;
  lnBalance: number;
  onReceive: () => void;
  onSend: () => void;
}
