import { randomTagColor } from "../shared/colors";

const all = `Wall clock time*COLTotal execution time*ROWCPU time*COLTime spent executing the program*ROWCompulsory misses*COLFirst time a block is used (first reference)*ROWCapacity misses*COLBlock used, later discarded, used again*ROWConflict misses*COLRepeated references to different blocks that map to same cache location*ROWWay prediction*COLExtra bits kept in cache to predict the way (or block within the set) of the next cache access
Mux set early to select the desired block*ROWVictim cache*COLA small cache that holds items recently expelled from the cache*ROWCritical word first*COLRequest missed word from memory first, send to proc as soon as it arrives*ROWEarly restart*COLRequest words in normal order, send missed word to proc as soon as it arrives*ROWCompiler blocking*COLSubdivide matrices into blocks, more memory access but improves spatial locality*ROWHardware prefetch*COLFetch next sequential block, spatial locality*ROWCompiler prefetch*COLCompiler inserts prefetch instructions*ROWNonblocking cache*COLA cache that allows the processor to make references to the cache while the cache is handling an earlier miss*ROWCycle time*COLTime between starting memory accesses*ROWSRAM*COLStatic RAM
Used for cache
Low power
6 transistors per bit
Transistors and latches*ROWDRAM*COLDynamic RAM
Rewrite after read
Refresh every 8ms
6 transistors per bit
Access strobe, upper half row (RAS), lower half column (CAS)
Cheaper
Transistors and capacitors*ROWDDRs*COLVoltage goes down
Frequency goes up*ROWGDDR5*COLBased on DRR3
2-5x bandwidth
Wider interface (32 vs 16 bit)
Higher clock rate as soldered vs socketed*ROWFlash memory*COLType of EEPROM
Erase before write
Non volatile
Limited write cycles
Cheaper than SDRAM, slower than SRAM*ROWSDRAM*COLSynchronized DRAM
Access on both falling and rising edge of clock cycle*ROWSoft memory errors*COLDynamic
Detected and fixed via ECC*ROWHard memory errors*COLPermanent
Use sparse rows to replace defective ones*ROWChipkill*COLECC, raid-like*ROWVirtual memory*COLSeparate address spaces
Protects processes by keeping them in their own address space*ROWLoop level parallelism*COLUnroll loops
Use SIMD*ROWAntidependence*COL\`i\` reads from location \`j\` later writes to
Must preserve order*ROWOutput dependence*COL\`i\` and \`j\` write to same place
Must preserve order*ROWControl dependence*COLCannot move instruction before branch if it depends on the branch (e.g. branch condition limits when it should run)*ROWTomasulo's Algorithm*COLTrack when operands are available
Does register renaming in hardware, minimizing WAR/WAW
FIFO queue for RS*ROWReorder buffer*COLThe buffer that holds results in a dynamically scheduled processor until it is safe to store the results to memory or a register*ROWVLIW*COLVery Long Instruction Word
Package multiple operations into one instruction*ROWBranch folding*COLFor larger branch target buffer
Add actual instruction to the branch instead of just branch address
Reduce CPI*ROWReturn address predictor*COLMost unconditional branches come from function return
Predict where return will go*ROWIntegrated Instruction Fetch Unit*COLMonolithic unit that performs branch prediction, instruction prefetch, instruction memory
Access and buffering*ROWCPU simulator*COLSimulate just CPU*ROWMicroarchitecture simulator*COLSimulate cache, dynamic instruction translation*ROWFull-system simulator*COLSimulate everything, deal with IO*ROWSOC simulator*COLSimulate SOC, CPU/GPU/IO/etc*ROWFull cycle-accurate simulator*COLSimulate everything*ROWInstruction set/functional simulator*COLSimulate functionality but not exactly*ROWSampling*COLStatistical simulation
Tries to improve speed
Only fully simulate small part*ROWWarming problem*COLRestart full cycle accurate simulation after running in functional mode*ROWCheckpointing*COLHigh level, cache and dir tags, complete memory data
Low level, registers, TLB, BP, cache tags, touched memory
Both*ROWPower model*COLNot cycle accurate
Use a model and empirical experimentation*ROWPLD*COLProgrammable Logic Devices
Connect with global interconnect matrix*ROWCLB*COLConfigurable Logic Block
Use in mesh
Each performs logical function (e.g. XOR/AND)
Switches programmed to connect CLBs*ROWLUT*COLLookup table
Bits set to define logic function
Output stored in flip flop or used as other LUT*ROWLogic synthesis*COLTransform HDL into netlist*ROWNetlist*COLDescription of circuit connections*ROWTranslator*COLMerges multiple netlists*ROWMapper*COLCombine gates in netlist to fit into available LUT structure*ROWPlace and route*COLAssign LUT groups to real locations
Assign connections on switching matrix*ROWConvoy*COLSet of vector instructions that could execute together*ROWVLR*COLVector Length Register
Use strip mining*ROWVector mask register*COLBoolean vector register to disable certain elements*ROWScatter gather*COLUse contents of auxiliary vector to select which elements of main vector should be used*ROWChaining*COLAllow dependent instructions to execute as soon as the result of the previous instruction is available
Requires multiple functional units as same unit cannot be used back to back*ROWMemory banks*COLMust support high bandwidth for vector loads and stores
Spread accesses across multiple banks
Successive data stored in successive banks*ROWThreads and banks*COLThreads associated with each data element, organized into blocks
Blocks organized into grids*ROWOpenCL*COLC-like language, targets heterogeneous hardware*ROWPlatform model*COLHost/device relationship
Defines abstract hardware model
Functions called kernels
Divided into compute units into processing elements*ROWExecution model*COLHow OpenCL is configured and kernels are executed
Sets up context on host
Allows interaction
Defines concurrency model*ROWMemory model*COLIndependent from underlying memory, closely resembles GPU architecture*ROWProgramming model*COLHow the concurrency model is mapped to physical hardware*ROWConcurrency model*COLHierarchy model of work groups and work items
Very scalable
Kernels specified in n-dimensional range (ND-Range), corresponds to dimensionality of input or output space*ROWBarrier synchronisation*COLPerformed by work items in work group*ROWThread structure*COLEach thread computes one part of problem
Similar structure to data*ROWOpenCL memory types*COLGlobal - access by everything
Constant - global read only
Local - per work group
Private - per work item
Movement is explicit*ROWBus addressing*COLWide bus, wider than data size
Given desired address, mask LSB until aligned with bus width
Get back useful and wasted data*ROWCoalescing*COLCombine memory accesses to reduce wasted bytes
Possible when threads access memory inside of bus width range
AMD Wavefront, NVIDIA Warp*ROWBank conflicts*COLLargest negative effect on local memory operatoins
Wavefront stalls until finished*ROWDivergent control flow*COLDivergent is when for example all even items execute code
Non divergent is when for example first half of items execute code*ROWTask parallelism*COLDistribution of independent (though sometimes communicating) processes*ROWData parallelism*COLDifferent data, multiple processing units, some/similar operations performed*ROWOpenMP*COLShared memory, loop based parallelism
Abstraction on top of threads
If no dependencies, run loop in parallel*ROWMPI*COLMessage passing interface
Good for distributed memory, high overhead for shared memory*ROWPGAS*COLPartitioned global address space
Abstraction of distributed memory
All memory presented as stored*ROWSMT*COLSimultaneous multithreading (hyperthreading)
Increase performance by filling up processing time lost to memory latency
If one thread stalls, switch to other one*ROWPareto front*COLEvaluate multi dimensional inputs*ROWThread level parallelism*COLMIMD, multiple PCs
Tightly coupled shared memory multiprocessors*ROWSMP*COLSymmetric multiprocessors
Small number of cores, share single memory, uniform latency*ROWDSM*COLDistributed shared memory among processors
Non uniform memory access (NUMA) latency
Processes connected by direct (switched) and indirect (multihop)*ROWCoherence*COLReads must return most recently written value
Coherence defines what values can be returned by a read
Consistency determines when a written value will be returned by a read*ROWSnoopy coherence*COLEvery cache that has a copy of the data tracks the sharing status of the block
Monitors broadcast medium (e.g. bus)*ROWSoft application*COL100% accuracy not required
Image compression, processing, ML, etc*ROWApproximate computing*COLExploit gaps between level of accuracy required/provided in order to achieve optimizations
Hard to identify, use pragma like OpenMP or automatically find using mutation testing*ROWPrecision scaling*COLDynamically vary precision of FP numbers
Find min precision required at design time*ROWLoop perforation*COLSkip some iterations of loops*ROWLoad value approximation*COLOn cache miss, predict contents, no stall*ROWMemorization*COLCache function calls with same inputs if pure*ROWSet associative cache*COLCache contains sets
Sets contain blocks
Blocks mapped to set, placed anywhere within set*ROWn-way set associative*COLn blocks in a set*ROWDirect mapped cache*COLOne block per set
Block always placed in same location*ROWFully associative cache*COLOnly one set, blocks anywhere in set*ROWSuperscalar*COLMultiple functional units or multiple cores
End up doing more than 1 IPC*ROWChime*COLUnit of time taken to execute one convoy
m convoys executes in m chimes; for vector length n, approximately m*n cycles*ROWStrip mining*COLEnsure each vector operation is done in size less than or equal to MVL (maximum vector length)*ROWStride*COLDistance separating elements to be gathered into a single register
Access nonsequential memory locations to reshape into dense structures*ROWWrite serialization*COLEnsuring all writes to the same location are seen in the same order*ROWDirectory based cache*COLSharing status of memory block kept in one location*ROWExclusive access cache*COLNo other readable or writeable copies of an item exist when the write occurs
All other cached copies are invalidated*ROWData hazard*COLOccurs when dependence results in incorrect execution*ROW`;

let nextTagID = 1;
let nextCardID = 1;

const tagTexts: [string, string][] = [
  ["Compiler", randomTagColor()],
  ["Cache", randomTagColor()],
  ["Memory", randomTagColor()],
  ["GPU", randomTagColor()],
  ["CPU", randomTagColor()]
];

export const resTags = tagTexts.map(tagText => ({
  tag_id: (nextTagID++).toString(),
  text: tagText[0],
  color: tagText[1]
}));

const randomTags = () => {
  const tagCount = Math.floor(Math.random() * resTags.length);
  const tagIDs: string[] = [];

  while (tagIDs.length < tagCount) {
    const tagNum = Math.floor(Math.random() * resTags.length);
    const tagID = resTags[tagNum].tag_id;
    if (tagIDs.indexOf(tagID) === -1) tagIDs.push(tagID);
  }

  return tagIDs;
};

export const resCards = all
  .split("*ROW")
  .map(row => row.split("*COL").map(col => col.trim()))
  .filter(row => row.length > 1)
  .map(row => ({
    card_id: (nextCardID++).toString(),
    title: row[0],
    text: row[1],
    tag_ids: randomTags().sort()
  }));
