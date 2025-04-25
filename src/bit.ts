/**
 * ビット演算型
 */

// ビット定義

type Bit = 0 | 1;

// ビット論理和
type Or<L extends Bit, R extends Bit> = `${L}${R}` extends `00` ? 0 : 1;

// ビット論理積
type And<L extends Bit, R extends Bit> = `${L}${R}` extends `11` ? 1 : 0;

// ビット否定
type Not<T extends Bit> = {
	0: 1;
	1: 0;
}[T];

// 任意の長さのビット配列を生成
// Indexの位置に1を立てる
type BitTuple<Length extends number, Index extends number> = ComputeBitTuple<
	Length,
	Index,
	[]
>;
type ComputeBitTuple<
	Length extends number,
	Index extends number,
	Tail extends Bit[],
> = Tail["length"] extends Length
	? Tail
	: ComputeBitTuple<
			Length,
			Index,
			[...Tail, Index extends Tail["length"] ? 1 : 0]
		>;

// ビット配列の論理和を取得する
type BitTupleOr<
	L extends Bit[],
	R extends Bit[],
> = L["length"] extends R["length"]
	? ComputeBitOr<L["length"], L, R, []>
	: never;
type ComputeBitOr<
	Length extends number,
	L extends Bit[],
	R extends Bit[],
	Result extends Bit[],
> = Result["length"] extends Length
	? Result
	: ComputeBitOr<
			Length,
			L,
			R,
			[...Result, Or<L[Result["length"]], R[Result["length"]]>]
		>;

// ビット配列の論理積を取得する
type BitTupleAnd<
	L extends Bit[],
	R extends Bit[],
> = L["length"] extends R["length"]
	? ComputeBitAnd<L["length"], L, R, []>
	: never;
type ComputeBitAnd<
	Length extends number,
	L extends Bit[],
	R extends Bit[],
	Result extends Bit[],
> = Result["length"] extends Length
	? Result
	: ComputeBitAnd<
			Length,
			L,
			R,
			[...Result, And<L[Result["length"]], R[Result["length"]]>]
		>;

// ビット配列の否定を取得する
type BitTupleNot<L extends Bit[]> = ComputeBitNot<L["length"], L, []>;
type ComputeBitNot<
	Length extends number,
	L extends Bit[],
	Result extends Bit[],
> = Result["length"] extends Length
	? Result
	: ComputeBitNot<Length, L, [...Result, Not<L[Result["length"]]>]>;

type BitIndexOf<T extends Bit[], Target extends Bit> = TupleToUnion<
	ComputeBitIndexOf<T, Target, [], []>
>;
type ComputeBitIndexOf<
	T extends Bit[],
	Target extends Bit,
	End extends Bit[],
	Result extends number[],
> = End["length"] extends T["length"]
	? Result
	: ComputeBitIndexOf<
			T,
			Target,
			[...End, T[End["length"]]],
			T[End["length"]] extends Target ? [...Result, End["length"]] : Result
		>;

// tupleをunionに変換する
type TupleToUnion<T extends unknown[]> = T[number];

export type {
	Bit,
	Or,
	And,
	Not,
	BitTuple,
	BitTupleOr,
	BitTupleAnd,
	BitTupleNot,
	BitIndexOf,
};
