import { expectTypeOf, test } from "vitest";
import type {
	ChangePlayer,
	CheckNextPlace,
	GetNextPlace,
	IsWin,
	Play,
	Player1,
	Player2,
} from "./playboard";

test("ターンの交代", () => {
	expectTypeOf<ChangePlayer<Player1>>().toEqualTypeOf<Player2>();
	expectTypeOf<ChangePlayer<Player2>>().toEqualTypeOf<Player1>();
});

test("次に駒を置くことが可能な箇所を取得する", () => {
	expectTypeOf<
		GetNextPlace<{
			player1: [0, 0, 0, 0, 0, 0, 0, 0, 0];
			player2: [0, 0, 0, 0, 0, 0, 0, 0, 0];
			nextPlayer: Player1;
		}>
	>().toEqualTypeOf<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>();
	expectTypeOf<
		GetNextPlace<{
			player1: [1, 0, 0, 0, 0, 0, 0, 0, 0];
			player2: [0, 0, 0, 0, 0, 0, 0, 0, 0];
			nextPlayer: Player2;
		}>
	>().toEqualTypeOf<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>();
	expectTypeOf<
		GetNextPlace<{
			player1: [1, 0, 0, 0, 0, 0, 0, 0, 0];
			player2: [0, 0, 0, 0, 0, 0, 0, 0, 1];
			nextPlayer: Player1;
		}>
	>().toEqualTypeOf<1 | 2 | 3 | 4 | 5 | 6 | 7>();
});

test("指定した位置が次に駒を置くことが可能かを判定し、問題なければ指定した位置をそのまま返す", () => {
	expectTypeOf<
		CheckNextPlace<
			{
				player1: [0, 0, 0, 0, 0, 0, 0, 0, 0];
				player2: [0, 0, 0, 0, 0, 0, 0, 0, 0];
				nextPlayer: Player1;
			},
			0
		>
	>().toEqualTypeOf<true>();
	expectTypeOf<
		CheckNextPlace<
			{
				player1: [1, 0, 0, 0, 0, 0, 0, 0, 0];
				player2: [0, 0, 0, 0, 0, 0, 0, 0, 0];
				nextPlayer: Player2;
			},
			0
		>
	>().toEqualTypeOf<false>();
});

test("盤面を進める", () => {
	type InitialPlayboard = {
		player1: [0, 0, 0, 0, 0, 0, 0, 0, 0];
		player2: [0, 0, 0, 0, 0, 0, 0, 0, 0];
		nextPlayer: Player1;
	};
	expectTypeOf<Play<InitialPlayboard, 0>>().toEqualTypeOf<{
		player1: [1, 0, 0, 0, 0, 0, 0, 0, 0];
		player2: [0, 0, 0, 0, 0, 0, 0, 0, 0];
		nextPlayer: Player2;
	}>();
});

test("勝敗を判定する", () => {
	// 横一列
	expectTypeOf<IsWin<[1, 1, 1, 0, 0, 0, 0, 0, 0]>>().toEqualTypeOf<true>();
	expectTypeOf<IsWin<[0, 0, 0, 1, 1, 1, 0, 0, 0]>>().toEqualTypeOf<true>();
	expectTypeOf<IsWin<[0, 0, 0, 0, 0, 0, 1, 1, 1]>>().toEqualTypeOf<true>();

	// 縦一列
	expectTypeOf<IsWin<[1, 0, 0, 1, 0, 0, 1, 0, 0]>>().toEqualTypeOf<true>();
	expectTypeOf<IsWin<[0, 1, 0, 0, 1, 0, 0, 1, 0]>>().toEqualTypeOf<true>();
	expectTypeOf<IsWin<[0, 0, 1, 0, 0, 1, 0, 0, 1]>>().toEqualTypeOf<true>();

	// 斜め一列
	expectTypeOf<IsWin<[1, 0, 0, 0, 1, 0, 0, 0, 1]>>().toEqualTypeOf<true>();
	expectTypeOf<IsWin<[0, 0, 1, 0, 1, 0, 1, 0, 0]>>().toEqualTypeOf<true>();

	// それ以外
	expectTypeOf<IsWin<[0, 0, 0, 0, 0, 0, 0, 0, 0]>>().toEqualTypeOf<false>();
});
