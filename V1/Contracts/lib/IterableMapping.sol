// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

library IterableMapping {
    // Iterable mapping from address to uint;
    struct Map {
        address[] accountKeys;
        mapping(address => uint) values;
        mapping(address => uint) indexOf;
        mapping(address => bool) inserted;
    }

    function get(Map storage map, address key) public view returns (uint) {
        return map.values[key];
    }

    function getKeyAtIndex(Map storage map, uint index) public view returns (address) {
        return map.accountKeys[index];
    }

    function size(Map storage map) public view returns (uint) {
        return map.accountKeys.length;
    }

    function set(
        Map storage map,
        address accountKey,
        uint newBalance
    ) public {
        map.values[accountKey] = newBalance;
        if (!map.inserted[accountKey]) {
            map.inserted[accountKey] = true;
            map.indexOf[accountKey] = map.accountKeys.length;
            map.accountKeys.push(accountKey);
        }
    }

    function remove(Map storage map, address accountKey) public {
        if (!map.inserted[accountKey]) {
            return;
        }

        delete map.inserted[accountKey];
        delete map.values[accountKey];

        uint index = map.indexOf[key];
        uint lastIndex = map.accountKeys.length - 1;
        address lastKey = map.accountKeys[lastIndex];

        map.indexOf[lastKey] = index;
        delete map.indexOf[key];

        map.accountKeys[index] = lastKey;
        map.accountKeys.pop();
    }
}

contract TestIterableMap {
    using IterableMapping for IterableMapping.Map;

    IterableMapping.Map private map;

    function testIterableMap() public {
        map.set(address(0), 0);
        map.set(address(1), 100);
        map.set(address(2), 200); // insert
        map.set(address(2), 200); // update
        map.set(address(3), 300);

        for (uint i = 0; i < map.size(); i++) {
            address key = map.getKeyAtIndex(i);

//            assert(map.get(key) == i * 100);
        }

        map.remove(address(1));

        // accountKeys = [address(0), address(3), address(2)]
 //       assert(map.size() == 3);
 //       assert(map.getKeyAtIndex(0) == address(0));
 //       assert(map.getKeyAtIndex(1) == address(3));
 //       assert(map.getKeyAtIndex(2) == address(2));
    }
}