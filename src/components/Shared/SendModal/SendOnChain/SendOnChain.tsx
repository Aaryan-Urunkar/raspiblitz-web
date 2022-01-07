import type { ChangeEvent, FC } from "react";
import { useContext, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AppContext, Unit } from "../../../../store/app-context";
import { convertSatToBtc, convertToString } from "../../../../util/format";
import AmountInput from "../../AmountInput/AmountInput";
import InputField from "../../InputField/InputField";

interface IFormInputs {
  addressInput: string;
  feeInput: number;
  amountInput: number;
  commentInput: string;
}

const SendOnChain: FC<SendOnChainProps> = (props) => {
  const { t } = useTranslation();
  const { unit } = useContext(AppContext);

  const {
    address,
    balance,
    comment,
    fee,
    onChangeAddress,
    onChangeComment,
    onChangeFee,
    onConfirm,
  } = props;

  const [amount, setAmount] = useState(props.amount);

  const changeAmountHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(+event.target.value);
  };

  const balanceDecorated =
    unit === Unit.BTC
      ? convertToString(unit, convertSatToBtc(balance))
      : convertToString(unit, balance);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, submitCount },
  } = useForm<IFormInputs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInputs> = (_data) => onConfirm();

  return (
    <form className="px-5" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl font-bold">{t("wallet.send_onchain")}</h3>

      <p className="my-5">
        <span className="font-bold">{t("wallet.balance")}:&nbsp;</span>
        {balanceDecorated} {unit}
      </p>

      <fieldset className="my-5 flex flex-col justify-center text-center items-center">
        <div className="w-full md:w-10/12 py-1">
          <InputField
            {...register("addressInput", {
              required: t("forms.validation.chainAddress.required") as string,
              pattern: {
                value: /^(1|3|bc1|tb1|tpub|bcrt)\w+/i,
                message: t("forms.validation.chainAddress.patternMismatch"),
              },
              onChange: onChangeAddress,
            })}
            placeholder="bc1..."
            label={t("wallet.address")}
            errorMessage={errors.addressInput}
            value={address}
          />
        </div>

        <div className="w-full md:w-10/12 py-1">
          <AmountInput
            amount={amount}
            errorMessage={errors?.amountInput}
            register={register("amountInput", {
              required: t("forms.validation.chainAmount.required") as string,
              max: {
                value: balance,
                message: t("forms.validation.chainAmount.max"),
              },
              validate: {
                greaterThanZero: (value) =>
                  value > 0 ||
                  (t("forms.validation.chainAmount.required") as string),
              },
              onChange: changeAmountHandler,
            })}
          />
        </div>

        <div className="w-full md:w-10/12 py-1">
          <InputField
            {...register("feeInput", {
              required: t("forms.validation.chainFee.required") as string,
              onChange: onChangeFee,
            })}
            label={t("tx.fee")}
            errorMessage={errors.feeInput}
            value={fee}
            inputRightAddon="sat / vByte"
            type="number"
          />
        </div>

        <div className="w-full md:w-10/12 py-1">
          <InputField
            {...register("commentInput", {
              onChange: onChangeComment,
            })}
            label={t("tx.comment")}
            value={comment}
            placeholder={t("tx.comment_placeholder")}
          />
        </div>
      </fieldset>

      <div className="inline-block w-4/5 lg:w-3/12 align-top mb-5">
        <button
          type="submit"
          className="bd-button p-3 my-3"
          disabled={submitCount > 0 && !isValid}
        >
          {t("wallet.confirm")}
        </button>
      </div>
    </form>
  );
};

export default SendOnChain;

export interface SendOnChainProps {
  address: string;
  amount: number;
  balance: number;
  comment: string;
  fee: string;
  onChangeAddress: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeComment: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeFee: (event: ChangeEvent<HTMLInputElement>) => void;
  onConfirm: () => void;
}
