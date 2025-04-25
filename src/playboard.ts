import type { Bit, BitIndexOf, BitTuple, BitTupleOr } from "./bit";

type Player1 = "P1";
type Player2 = "P2";
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

type IsWin<T extends Bit[]> =
	// 横一列
	0 | 1 | 2 extends BitIndexOf<T, 1>
		? true
		: 3 | 4 | 5 extends BitIndexOf<T, 1>
			? true
			: 6 | 7 | 8 extends BitIndexOf<T, 1>
				? true
				: // 縦一列
					0 | 3 | 6 extends BitIndexOf<T, 1>
					? true
					: 1 | 4 | 7 extends BitIndexOf<T, 1>
						? true
						: 2 | 5 | 8 extends BitIndexOf<T, 1>
							? true
							: // 斜め一列
								0 | 4 | 8 extends BitIndexOf<T, 1>
								? true
								: 2 | 4 | 6 extends BitIndexOf<T, 1>
									? true
									: // それ以外
										false;

export type {
	Playboard,
	ChangePlayer,
	GetNextPlace,
	CheckNextPlace,
	Play,
	IsWin,
};
