// 3rd-party imports

import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

// local imports

import HashChange from "src/";

// eslint-disable-next-line
const displayHash = ({ hash }) => {
    const text = `hash: ${hash}`;
    return <div>{text}</div>;
};

const changeHash = hash => {
    window.location.hash = hash;
};

describe("render prop", () => {
    let node;

    beforeEach(() => {
        node = document.createElement("div");
    });

    afterEach(() => {
        unmountComponentAtNode(node);
    });

    it("displays default hash", () => {
        render(<HashChange render={displayHash} />, node, () => {
            expect(node.innerHTML).toContain("hash: ");
        });
    });

    it("displays changed hash", () => {
        changeHash("foobar");

        render(<HashChange render={displayHash} />, node, () => {
            expect(node.innerHTML).toContain("hash: #foobar");
        });

        const event = new CustomEvent("hashchange", {});
        changeHash("cats");
        window.dispatchEvent(event);

        expect(node.innerHTML).toContain("hash: #cats");
    });

    it("render prop is favoured over child function", () => {
        changeHash("foobar");

        let calls = 0;
        // eslint-disable-next-line
        const displayHash2 = ({ hash }) => {
            calls++;
            const text = `hash2: ${hash}`;
            return <div>{text}</div>;
        };

        // eslint-disable-next-line
        const displayHash3 = ({ hash }) => {
            calls++;
            const text = `hash3: ${hash}`;
            return <div>{text}</div>;
        };

        render(
            <HashChange render={displayHash2}>{displayHash3}</HashChange>,
            node,
            () => {
                expect(node.innerHTML).toContain("hash2: #foobar");
            }
        );

        expect(calls).toEqual(1);

        const event = new CustomEvent("hashchange", {});
        changeHash("cats");
        window.dispatchEvent(event);

        expect(calls).toEqual(2);
        expect(node.innerHTML).toContain("hash2: #cats");
    });
});

describe("function as child prop", () => {
    let node;

    beforeEach(() => {
        node = document.createElement("div");
    });

    afterEach(() => {
        unmountComponentAtNode(node);
    });

    it("displays default hash", () => {
        render(<HashChange>{displayHash}</HashChange>, node, () => {
            expect(node.innerHTML).toContain("hash: ");
        });
    });

    it("displays changed hash", () => {
        changeHash("foobar");

        render(<HashChange>{displayHash}</HashChange>, node, () => {
            expect(node.innerHTML).toContain("hash: #foobar");
        });

        const event = new CustomEvent("hashchange", {});
        changeHash("cats");
        window.dispatchEvent(event);

        expect(node.innerHTML).toContain("hash: #cats");
    });
});

describe("onChange", () => {
    let node;

    beforeEach(() => {
        node = document.createElement("div");
    });

    afterEach(() => {
        unmountComponentAtNode(node);
    });

    it("triggers when hash changes", () => {
        let num_of_calls = 0;
        const onChange = ({ hash }) => {
            expect(num_of_calls).toEqual(0);
            num_of_calls++;
            expect(hash).toEqual("#foobar");
        };

        changeHash("baz");

        render(
            <HashChange onChange={onChange}>{displayHash}</HashChange>,
            node,
            () => {
                expect(node.innerHTML).toContain("hash: #baz");
            }
        );

        const event = new CustomEvent("hashchange", {});
        changeHash("foobar");
        window.dispatchEvent(event);

        expect(num_of_calls).toEqual(1);
        expect(node.innerHTML).toContain("hash: #foobar");
    });
});

describe("getLocationHash", () => {
    let node;

    beforeEach(() => {
        node = document.createElement("div");
    });

    afterEach(() => {
        unmountComponentAtNode(node);
    });

    it("value passed to onChange and child function", () => {
        let num_of_calls = 0;
        const onChange = ({ hash }) => {
            expect(num_of_calls).toEqual(0);
            num_of_calls++;
            expect(hash).toEqual("getLocationHash: #foobar");
        };

        let num_of_calls_get_location_hash = 0;
        const getLocationHash = () => {
            num_of_calls_get_location_hash++;
            return `getLocationHash: ${window.location.hash}`;
        };

        // eslint-disable-next-line
        const displayHash2 = ({ hash }) => {
            const text = `hash2: ${hash}`;
            return <div>{text}</div>;
        };

        changeHash("baz");

        render(
            <HashChange onChange={onChange} getLocationHash={getLocationHash}>
                {displayHash2}
            </HashChange>,
            node,
            () => {
                expect(node.innerHTML).toContain(
                    "hash2: getLocationHash: #baz"
                );
            }
        );

        expect(num_of_calls_get_location_hash).toEqual(1);

        const event = new CustomEvent("hashchange", {});
        changeHash("foobar");
        window.dispatchEvent(event);

        expect(num_of_calls).toEqual(1);
        expect(num_of_calls_get_location_hash).toEqual(2);
        expect(node.innerHTML).toContain("hash2: getLocationHash: #foobar");
    });

    it("value passed to onChange and render prop", () => {
        let num_of_calls = 0;
        const onChange = ({ hash }) => {
            num_of_calls++;
            expect(hash).toEqual("getLocationHash: #foobar");
        };

        let num_of_calls_get_location_hash = 0;
        const getLocationHash = () => {
            num_of_calls_get_location_hash++;
            return `getLocationHash: ${window.location.hash}`;
        };

        // eslint-disable-next-line
        const displayHash2 = ({ hash }) => {
            const text = `hash2: ${hash}`;
            return <div>{text}</div>;
        };

        changeHash("baz");

        render(
            <HashChange
                onChange={onChange}
                getLocationHash={getLocationHash}
                render={displayHash2}
            />,
            node,
            () => {
                expect(node.innerHTML).toContain(
                    "hash2: getLocationHash: #baz"
                );
            }
        );

        expect(num_of_calls_get_location_hash).toEqual(1);

        const event = new CustomEvent("hashchange", {});
        changeHash("foobar");
        window.dispatchEvent(event);

        expect(num_of_calls).toEqual(1);
        expect(num_of_calls_get_location_hash).toEqual(2);
        expect(node.innerHTML).toContain("hash2: getLocationHash: #foobar");
    });
});
