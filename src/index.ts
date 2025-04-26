import type { Bit, BitTuple, BitTupleOr } from "./bit";
import type {
	CheckNextPlace,
	IsWin,
	Play,
	Playboard,
	Player1,
} from "./playboard";

// 勝敗判定
type CheckWin<CurrentPlayboard extends Playboard> = IsWin<
	CurrentPlayboard["player1"]
> extends true
	? `Winner is Player1!`
	: IsWin<CurrentPlayboard["player2"]> extends true
		? `Winner is Player2!`
		: BitTupleOr<
					CurrentPlayboard["player1"],
					CurrentPlayboard["player2"]
				> extends [1, 1, 1, 1, 1, 1, 1, 1, 1]
			? `Draw!`
			: CurrentPlayboard;

// 盤面の可視化
type FormatPlayboard<CurrentPlayboard extends Playboard> =
	ComputeFormatPlayboard<
		CurrentPlayboard["player1"],
		CurrentPlayboard["player2"],
		[],
		""
	>;
type ComputeFormatPlayboard<
	P1 extends Bit[],
	P2 extends Bit[],
	Formated extends Bit[],
	Result extends string,
> = P1["length"] extends Formated["length"]
	? Result
	: ComputeFormatPlayboard<
			P1,
			P2,
			[0, ...Formated],
			`${Result}${P1[Formated["length"]] extends 1
				? "O"
				: P2[Formated["length"]] extends 1
					? "X"
					: "-"}${Formated["length"] extends 2
				? " / "
				: Formated["length"] extends 5
					? " / "
					: ""}`
		>;

// ゲーム実行
type Run<
	Next extends number,
	CurrentPlayboard extends Playboard = {
		player1: BitTuple<9, -1>;
		player2: BitTuple<9, -1>;
		nextPlayer: Player1;
	},
> = CheckNextPlace<CurrentPlayboard, Next> extends true
	? CheckWin<Play<CurrentPlayboard, Next>>
	: `Hey! ${CurrentPlayboard["nextPlayer"]}!! Invalid Move!`;

// ビジュアルのよい○×ゲーム
// 駒
type OX = "O" | "X" | "-";
type OXToBit<T extends OX[], Target extends OX> = ComputeOXToBit<T, Target, []>;
type ComputeOXToBit<
	T extends OX[],
	Target extends OX,
	Result extends Bit[],
> = T["length"] extends Result["length"]
	? Result
	: ComputeOXToBit<
			T,
			Target,
			[...Result, T[Result["length"]] extends Target ? 1 : 0]
		>;
type TicTacToe<T extends OX[]> = CheckWin<{
	player1: OXToBit<T, "O">;
	player2: OXToBit<T, "X">;
	nextPlayer: Player1;
}>;

export type { Run, FormatPlayboard, TicTacToe };
