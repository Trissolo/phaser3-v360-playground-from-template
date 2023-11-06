const BITS_PER_TYPED_ARRAY_ELEMENT = 32; //from "./BITS_PER_TYPED_ARRAY_ELEMENT.mjs";

class VarManager
{
    // Variable containers
    static varContainers = new Map();

    static createByKind(kind, arrayLength = 2)
    {
        // we are using an Uint32Array
        
        // the size (in bits) of this kind of variable:
        // BOOL = 1 bit [0-1],
        // CRUMBLE = 2 bits [0-3],
        // NIBBLE = 4 bits [0-15],
        // BYTE = 8 bits [0-255]

        const varSize = 1 << kind;

        // amount of variables in each Typed Array element
        const varsPerElement = BITS_PER_TYPED_ARRAY_ELEMENT / varSize;

        // bitmask to extract/work on the variable
        const bitmask = (1 << varSize) - 1;

        let lastIdxAllowed = arrayLength;

        if (Array.isArray(arrayLength))
        {
            lastIdxAllowed = arrayLength[kind].length;

            console.log("CREATING", lastIdxAllowed, arrayLength[kind].length, "CEIL:", Math.ceil(arrayLength[kind].length * varSize / BITS_PER_TYPED_ARRAY_ELEMENT))
            arrayLength = Math.ceil(arrayLength[kind].length * varSize / BITS_PER_TYPED_ARRAY_ELEMENT);

        }

        const typedArray = new Uint32Array(arrayLength);

        return {varSize, varsPerElement, bitmask, typedArray, /*coords,*/ isBool: kind === 0, maximumCapacity: varsPerElement * arrayLength, lastIdxAllowed};
    }

    // sort of constructor
    static initialize(arrayOfStringArray)
    {      
        console.log("Variable Manager: INITIALIZE SimpleVarManager");

        // kind/key(containerIdx)|     varSize     |varsPerElement|bitmask
        // ----------------------|-----------------|--------------|-------
        //  0                    | 1 bit  (BOOL)   |      32      |   1   
        //  1                    | 2 bits (CRUMBLE)|      16      |   3   
        //  2                    | 4 bits (NIBBLE) |       8      |   15  
        //  3                    | 8 bits (BYTE)   |       4      |   255 

        for (let kind = 0; kind < 4; kind++)
        {
            this.varContainers.set(this.varContainers.size, this.createByKind(kind, arrayOfStringArray));
        }
        
    }  // end Initialize

    static newHandleAny(kind, varIdx, newValue, toggleBit)
    {
        const container = this.varContainers.get(kind);

        console.log("CHECK", varIdx, container.lastIdxAllowed);

        console.log(varIdx < container.lastIdxAllowed ? "OOOOOOOOOOOOOOOOOOOOK":"SSFORATO!");
        if (varIdx >= container.lastIdxAllowed || varIdx < 0)
        {
            console.clear()
            return console.error("NEW OUT OF RANGE!")
        }

        // calc coords:
        const {varsPerElement, typedArray} = container;
        let x = 0;
        let y = 0;

        if (varIdx >= 0 && varIdx < container.maximumCapacity)
        {
            if (varIdx < varsPerElement)
            {
                x = varIdx;
            }
            else
            {
                y = Math.floor(varIdx / varsPerElement);
                x = varIdx - (y * varsPerElement);
            }
        }
        else
        {
            return console.error(`Variable index (${varIdx}) out of range! [maxVarsPerElement: ${container.varsPerElement}, container: ${container.maximumCapacity}, maximumCapacity: ${container.maximumCapacity}]`);
        }

        // Now we have our x/y coords!

        // we will use the amount of arguments to determine the action to take (maybe for calling mapped functions):
        //this[arguments.lengt]();
        // 2 = read variable,
        // 3 = set variable,
        // 4 = toggle 1 bit (only in case of BOOL).

        // hmmm :/
        let argLength = arguments.length;

        //set:
        // first: clear!
        // if (typeof newValue === 'number')
        if (argLength === 3)
        {
            typedArray[y] &= ~(container.bitmask << x * container.varSize);
    
            if (newValue === 0)
            {
                return 0;
            }
            else
            {
                // Do we need to check the validity of "newValue", here?
    
                typedArray[y] |= (newValue << x * container.varSize);
    
    
                return newValue;
            }
        }

        // toggle bit
        // if (toggleBit && container.isBool)
        if (argLength === 4 && container.isBool)
        {
            typedArray[y] ^= (1 << x);
        }

        // read any var
        return container.isBool? (typedArray[y] >>> x) & 1 :  (typedArray[y] >>> x * container.varSize) & container.bitmask;
    }

    static handleAny(kind, varIdx, newValue, toggle)
    {
        const container = this.varContainers.get(kind);

        // calc coords:
        const {varsPerElement, typedArray} = container;
        let x = 0;
        let y = 0;

        if (varIdx >= 0 && varIdx < container.maximumCapacity)
        {
            if (varIdx < varsPerElement)
            {
                x = varIdx;
            }
            else
            {
                y = Math.floor(varIdx / varsPerElement);
                x = varIdx - (y * varsPerElement);
            }
        }
        else
        {
            return console.error(`Variable index (${varIdx}) out of range! [maxVarsPerElement: ${container.varsPerElement}, container: ${container.maximumCapacity}, maximumCapacity: ${container.maximumCapacity}]`);
        }

        //if no 'newValue', then just read on
        if (newValue === undefined)
        {
            console.log("READING VALUE", arguments.length);

            return container.isBool? (typedArray[y] >>> x) & 1 :  (typedArray[y] >>> x * container.varSize) & container.bitmask;
        }
        else
        {
            console.log("SETTING VALUE", arguments.length);

            // first: clear!
            typedArray[y] &= ~(container.bitmask << x * container.varSize);

            if (newValue === 0)
            {
                console.log("JUST CLEARED");

                return 0;
            }
            else
            {
                // Do we need to check the validity of "newValue", here?

                typedArray[y] |= (newValue << x * container.varSize);

                console.log(newValue);

                return newValue;
            }
        }
    }

    static betterGetXY()
    {
        const container = this.varContainers.get(kind);

        const {varsPerElement} = container;
        let x = 0;
        let y = 0;

        if (varIdx >= 0 && varIdx < container.maximumCapacity)
        {
            if (varIdx < varsPerElement)
            {
                x = varIdx;
            }
            else
            {
                y = Math.floor(varIdx / varsPerElement);
                x = varIdx - (y * varsPerElement);
            }

            return {x, y, container}
        }
        else
        {
            return console.error(`Variable index (${varIdx}) out of range! [maxVarsPerElement: ${container.varsPerElement}, container: ${container.maximumCapacity}, maximumCapacity: ${container.maximumCapacity}]`);
        }
    }
}

VarManager.initialize([ ["b1", "b2", "b3"], new Array(18).fill(null), new Array(17).fill(null), [...'ABC']]);

export default VarManager;
