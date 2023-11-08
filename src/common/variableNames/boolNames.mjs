const boolNames = [
    // 'r0_wrenchTaken_$0',
    // 'r0_doorOpen_$1',
    // 'r0_crateIsOpen_$2',
    // 'r1_cabinetIsOpen_$3',
    // 'r0_crateIsLocked_$4',
    // 'r1_blastdoor_isLocked_$5',
    // 'r1_blastdoor_isOpen_$6'
];

const {length} = boolNames;

for (let i = 0; i < 33; i++)
{
    boolNames.push(`test_${i + length}`);
}

boolNames.push('Last 1-bit Variable');

export default boolNames;
