import { expectTypeOf, test } from "vitest";
import type { FormatPlayboard, Run, TicTacToe } from ".";

test("○×ゲームで遊ぶ - 縦の勝利", () => {
	type P1 = Run<0>;
	expectTypeOf<FormatPlayboard<P1>>().toEqualTypeOf<"O-- / --- / ---">();
	type P2 = Run<1, P1>;
	expectTypeOf<FormatPlayboard<P2>>().toEqualTypeOf<"OX- / --- / ---">();
	type P3 = Run<3, P2>;
	expectTypeOf<FormatPlayboard<P3>>().toEqualTypeOf<"OX- / O-- / ---">();
	type P4 = Run<4, P3>;
	expectTypeOf<FormatPlayboard<P4>>().toEqualTypeOf<"OX- / OX- / ---">();
	type P5 = Run<6, P4>;
	expectTypeOf<P5>().toEqualTypeOf<"Winner is Player1!">();
});

test("○×ゲームで遊ぶ - 横の勝利", () => {
	type P1 = Run<0>;
	expectTypeOf<FormatPlayboard<P1>>().toEqualTypeOf<"O-- / --- / ---">();
	type P2 = Run<3, P1>;
	expectTypeOf<FormatPlayboard<P2>>().toEqualTypeOf<"O-- / X-- / ---">();
	type P3 = Run<1, P2>;
	expectTypeOf<FormatPlayboard<P3>>().toEqualTypeOf<"OO- / X-- / ---">();
	type P4 = Run<4, P3>;
	expectTypeOf<FormatPlayboard<P4>>().toEqualTypeOf<"OO- / XX- / ---">();
	type P5 = Run<2, P4>;
	expectTypeOf<P5>().toEqualTypeOf<"Winner is Player1!">();
});

test("○×ゲームで遊ぶ - 斜めの勝利パターン", () => {
	type P1 = Run<0>;
	expectTypeOf<FormatPlayboard<P1>>().toEqualTypeOf<"O-- / --- / ---">();
	type P2 = Run<3, P1>;
	expectTypeOf<FormatPlayboard<P2>>().toEqualTypeOf<"O-- / X-- / ---">();
	type P3 = Run<4, P2>;
	expectTypeOf<FormatPlayboard<P3>>().toEqualTypeOf<"O-- / XO- / ---">();
	type P4 = Run<2, P3>;
	expectTypeOf<FormatPlayboard<P4>>().toEqualTypeOf<"O-X / XO- / ---">();
	type P5 = Run<8, P4>;
	expectTypeOf<P5>().toEqualTypeOf<"Winner is Player1!">();
});

test("○×ゲームで遊ぶ - 引き分けパターン", () => {
	type P1 = Run<1>;
	expectTypeOf<FormatPlayboard<P1>>().toEqualTypeOf<"-O- / --- / ---">();
	type P2 = Run<0, P1>;
	expectTypeOf<FormatPlayboard<P2>>().toEqualTypeOf<"XO- / --- / ---">();
	type P3 = Run<4, P2>;
	expectTypeOf<FormatPlayboard<P3>>().toEqualTypeOf<"XO- / -O- / ---">();
	type P4 = Run<2, P3>;
	expectTypeOf<FormatPlayboard<P4>>().toEqualTypeOf<"XOX / -O- / ---">();
	type P5 = Run<5, P4>;
	expectTypeOf<FormatPlayboard<P5>>().toEqualTypeOf<"XOX / -OO / ---">();
	type P6 = Run<3, P5>;
	expectTypeOf<FormatPlayboard<P6>>().toEqualTypeOf<"XOX / XOO / ---">();
	type P7 = Run<6, P6>;
	expectTypeOf<FormatPlayboard<P7>>().toEqualTypeOf<"XOX / XOO / O--">();
	type P8 = Run<7, P7>;
	expectTypeOf<FormatPlayboard<P8>>().toEqualTypeOf<"XOX / XOO / OX-">();
	type P9 = Run<8, P8>;
	expectTypeOf<P9>().toEqualTypeOf<"Draw!">();
});

test("○×ゲームで遊ぶ - 既に埋まっているマスに置こうとした場合", () => {
	type P1 = Run<0>;
	expectTypeOf<FormatPlayboard<P1>>().toEqualTypeOf<"O-- / --- / ---">();
	type P2 = Run<0, P1>;
	expectTypeOf<P2>().toEqualTypeOf<"Hey! Player2!! Invalid Move!">();
});

test("TicTacToe - Visualize Mode", () => {
	expectTypeOf<
		TicTacToe<[
			"X", "X", "-",
			"O", "O", "O",
			"-", "-", "-"
		]>
	>().toEqualTypeOf<"Winner is Player1!">();
});
