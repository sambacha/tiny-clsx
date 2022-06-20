import test from 'tape';
import * as toVal from './index.js';
import { clsx } from './index.js';

test('clsx', t => {
	t.is(typeof toVal, 'function', 'exports a function');
	t.is(typeof toVal(), 'string', '~> returns string output');
	t.is(toVal, clsx, "named import available");
	t.is(typeof clsx, "function", "exports a named function");
	t.is(typeof clsx(), "string", "~> returns string output");
	t.end();
});

test('strings', t => {
	t.is(toVal(''), '');
	t.is(toVal('foo'), 'foo');
	t.is(toVal(true && 'foo'), 'foo');
	t.is(toVal(false && 'foo'), '');
	t.end();
});

test('strings (variadic)', t => {
	t.is(toVal(''), '');
	t.is(toVal('foo', 'bar'), 'foo bar');
	t.is(toVal(true && 'foo', false && 'bar', 'baz'), 'foo baz');
	t.is(toVal(false && 'foo', 'bar', 'baz', ''), 'bar baz');
	t.end();
});

test('objects', t => {
	t.is(toVal({}), '');
	t.is(toVal({ foo:true }), 'foo');
	t.is(toVal({ foo:true, bar:false }), 'foo');
	t.is(toVal({ foo:'hiya', bar:1 }), 'foo bar');
	t.is(toVal({ foo:1, bar:0, baz:1 }), 'foo baz');
	t.is(toVal({ '-foo':1, '--bar':1 }), '-foo --bar');
	t.end();
});

test('objects (variadic)', t => {
	t.is(toVal({}, {}), '');
	t.is(toVal({ foo:1 }, { bar:2 }), 'foo bar');
	t.is(toVal({ foo:1 }, null, { baz:1, bat:0 }), 'foo baz');
	t.is(toVal({ foo:1 }, {}, {}, { bar:'a' }, { baz:null, bat:Infinity }), 'foo bar bat');
	t.end();
});

test('arrays', t => {
	t.is(toVal([]), '');
	t.is(toVal(['foo']), 'foo');
	t.is(toVal(['foo', 'bar']), 'foo bar');
	t.is(toVal(['foo', 0 && 'bar', 1 && 'baz']), 'foo baz');
	t.end();
});

test('arrays (nested)', t => {
	t.is(toVal([[[]]]), '');
	t.is(toVal([[['foo']]]), 'foo');
	t.is(toVal([true, [['foo']]]), 'foo');;
	t.is(toVal(['foo', ['bar', ['', [['baz']]]]]), 'foo bar baz');
	t.end();
});

test('arrays (variadic)', t => {
	t.is(toVal([], []), '');
	t.is(toVal(['foo'], ['bar']), 'foo bar');
	t.is(toVal(['foo'], null, ['baz', ''], true, '', []), 'foo baz');
	t.end();
});

test('arrays (no `push` escape)', t => {
	t.is(toVal({ push:1 }), 'push');
	t.is(toVal({ pop:true }), 'pop');
	t.is(toVal({ push:true }), 'push');
	t.is(toVal('hello', { world:1, push:true }), 'hello world push');
	t.end();
});

test('functions', t => {
	const foo = () => {};
	t.is(toVal(foo, 'hello'), 'hello');
	t.is(toVal(foo, 'hello', toVal), 'hello');
	t.is(toVal(foo, 'hello', [[toVal], 'world']), 'hello world');
	t.end();
});