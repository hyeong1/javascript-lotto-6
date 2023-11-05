import { MissionUtils } from "@woowacourse/mission-utils";

import PRINT from "../src/constant/print.js";
import ERROR from "../src/constant/error.js";
import Lotto from "./Lotto.js";

class App {
  lottoPrice = 1000;
  lottoTotal;
  allLottos = [];

  async askMoney() {
    const money = await MissionUtils.Console.readLineAsync(PRINT.ASK_BUY);
    return parseInt(money);
  }

  moneyTypeCheck(money) {
    if (isNaN(money)) {
      throw new Error(ERROR.NOT_NUMBER);
    }
    if (money % this.lottoPrice !== 0) {
      throw new Error(ERROR.NOT_1000N);
    }
  }

  howManyLotto(money) {
    this.lottoTotal = money / this.lottoPrice;
    return this.lottoTotal;
  }

  printAllLottos() {
    for (let l = 0; l < this.lottoTotal; l++) {
      const lotto = new Lotto(
        MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6)
      );
      this.allLottos.push(lotto);
    }
    this.allLottos.forEach((lotto) => {
      MissionUtils.Console.print(lotto.getLottoNumber().sort((a, b) => a - b));
    });
  }

  async play() {
    const inputMoney = await this.askMoney();
    this.moneyTypeCheck(inputMoney);

    MissionUtils.Console.print(
      this.howManyLotto(inputMoney) + PRINT.RESULT_BUY
    );
    this.printAllLottos();
  }
}

export default App;
