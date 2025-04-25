import { expectTypeOf, test } from "vitest";
import type {
	And,
	BitIndexOf,
	BitTuple,
	BitTupleAnd,
	BitTupleNot,
	BitTupleOr,
	Not,
	Or,
} from "./bit";

test("ビット論理和", () => {
	expectTypeOf<Or<0, 0>>().toEqualTypeOf<0>();
	expectTypeOf<Or<0, 1>>().toEqualTypeOf<1>();
	expectTypeOf<Or<1, 0>>().toEqualTypeOf<1>();
	expectTypeOf<Or<1, 1>>().toEqualTypeOf<1>();
});

test("ビット論理積", () => {
	expectTypeOf<And<0, 0>>().toEqualTypeOf<0>();
	expectTypeOf<And<0, 1>>().toEqualTypeOf<0>();
	expectTypeOf<And<1, 0>>().toEqualTypeOf<0>();
	expectTypeOf<And<1, 1>>().toEqualTypeOf<1>();
});

test("ビット否定", () => {
	expectTypeOf<Not<0>>().toEqualTypeOf<1>();
	expectTypeOf<Not<1>>().toEqualTypeOf<0>();
});

test("ビット配列生成", () => {
	expectTypeOf<BitTuple<3, 0>>().toEqualTypeOf<[1, 0, 0]>();
	expectTypeOf<BitTuple<3, 1>>().toEqualTypeOf<[0, 1, 0]>();
	expectTypeOf<BitTuple<3, 2>>().toEqualTypeOf<[0, 0, 1]>();
	expectTypeOf<BitTuple<5, 3>>().toEqualTypeOf<[0, 0, 0, 1, 0]>();

	// 配列参照外のインデックスを指定した場合のテスト
	expectTypeOf<BitTuple<3, 3>>().toEqualTypeOf<[0, 0, 0]>();
	expectTypeOf<BitTuple<3, 4>>().toEqualTypeOf<[0, 0, 0]>();
	expectTypeOf<BitTuple<5, 10>>().toEqualTypeOf<[0, 0, 0, 0, 0]>();
});

test("ビット配列論理和", () => {
	expectTypeOf<BitTupleOr<[0, 0, 0], [0, 0, 0]>>().toEqualTypeOf<[0, 0, 0]>();
	expectTypeOf<BitTupleOr<[1, 0, 0], [0, 1, 0]>>().toEqualTypeOf<[1, 1, 0]>();
	expectTypeOf<BitTupleOr<[1, 1, 0], [1, 0, 1]>>().toEqualTypeOf<[1, 1, 1]>();
	expectTypeOf<BitTupleOr<[0, 0, 1], [0, 1, 0]>>().toEqualTypeOf<[0, 1, 1]>();
});

test("ビット配列論理積", () => {
	expectTypeOf<BitTupleAnd<[0, 0, 0], [0, 0, 0]>>().toEqualTypeOf<[0, 0, 0]>();
	expectTypeOf<BitTupleAnd<[1, 0, 0], [0, 1, 0]>>().toEqualTypeOf<[0, 0, 0]>();
	expectTypeOf<BitTupleAnd<[1, 1, 0], [1, 0, 1]>>().toEqualTypeOf<[1, 0, 0]>();
	expectTypeOf<BitTupleAnd<[1, 1, 1], [1, 1, 1]>>().toEqualTypeOf<[1, 1, 1]>();
});

test("ビット配列否定", () => {
	expectTypeOf<BitTupleNot<[0, 0, 0]>>().toEqualTypeOf<[1, 1, 1]>();
	expectTypeOf<BitTupleNot<[1, 0, 1]>>().toEqualTypeOf<[0, 1, 0]>();
	expectTypeOf<BitTupleNot<[1, 1, 1]>>().toEqualTypeOf<[0, 0, 0]>();
});

test("ビット配列の中で指定したビットのインデックスを取得する", () => {
	expectTypeOf<BitIndexOf<[1, 1, 0], 1>>().toEqualTypeOf<0 | 1>();
});
