import type { Bit, BitIndexOf, BitTuple, BitTupleAnd, BitTupleOr } from "./bit";

type Player1 = "Player1";
type Player2 = "Player2";
type Player = Player1 | Player2;
type ChangePlayer<T extends Player> = T extends Player1 ? Player2 : Player1;

type Playboard = {
	player1: Bit[];
	player2: Bit[];
	nextPlayer: Player;
};

type GetNextPlace<CurrentPlayboard extends Playboard> = BitIndexOf<
	BitTupleOr<CurrentPlayboard["player1"], CurrentPlayboard["player2"]>,
	0
>;

type CheckNextPlace<
	CurrentPlayboard extends Playboard,
	Next extends number,
> = Next extends GetNextPlace<CurrentPlayboard> ? true : false;

type Play<CurrentPlayboard extends Playboard, Next extends number> = {
	player1: CurrentPlayboard["nextPlayer"] extends Player1
		? BitTupleOr<CurrentPlayboard["player1"], BitTuple<9, Next>>
		: CurrentPlayboard["player1"];
	player2: CurrentPlayboard["nextPlayer"] extends Player2
		? BitTupleOr<CurrentPlayboard["player2"], BitTuple<9, Next>>
		: CurrentPlayboard["player2"];
	nextPlayer: ChangePlayer<CurrentPlayboard["nextPlayer"]>;
};

type Mark0 = BitTuple<9, 0>;
type Mark1 = BitTuple<9, 1>;
type Mark2 = BitTuple<9, 2>;
type Mark3 = BitTuple<9, 3>;
type Mark4 = BitTuple<9, 4>;
type Mark5 = BitTuple<9, 5>;
type Mark6 = BitTuple<9, 6>;
type Mark7 = BitTuple<9, 7>;
type Mark8 = BitTuple<9, 8>;

type WinnerCondition = [
	// 横一列
	BitTupleOr<BitTupleOr<Mark0, Mark1>, Mark2>,
	BitTupleOr<BitTupleOr<Mark3, Mark4>, Mark5>,
	BitTupleOr<BitTupleOr<Mark6, Mark7>, Mark8>,
	// 縦一列
	BitTupleOr<BitTupleOr<Mark0, Mark3>, Mark6>,
	BitTupleOr<BitTupleOr<Mark1, Mark4>, Mark7>,
	BitTupleOr<BitTupleOr<Mark2, Mark5>, Mark8>,
	// 斜め一列
	BitTupleOr<BitTupleOr<Mark0, Mark4>, Mark8>,
	BitTupleOr<BitTupleOr<Mark2, Mark4>, Mark6>,
];

type IsWin<T extends Bit[]> = ComputeIsWin<T, []>;
type ComputeIsWin<
	T extends Bit[],
	Current extends number[],
> = Current["length"] extends WinnerCondition["length"]
	? false
	: BitTupleAnd<
				T,
				WinnerCondition[Current["length"]]
			> extends WinnerCondition[Current["length"]]
		? true
		: ComputeIsWin<T, [...Current, 0]>;

export type {
	Playboard,
	ChangePlayer,
	GetNextPlace,
	CheckNextPlace,
	Play,
	IsWin,
	Player1,
	Player2,
};
