const cardStr = `
Wall clock time[[[Total execution time]]]CPU time[[[Time spent executing the program]]]Compulsory misses[[[First time a block is used (first reference)]]]Capacity misses[[[Block used, later discarded, used again]]]Conflict misses[[[Repeated references to different blocks that map to same cache location]]]Way prediction[[[Extra bits kept in cache to predict the way (or block within the set) of the next cache access
  Mux set early to select the desired block]]]Victim cache[[[A small cache that holds items recently expelled from the cache]]]Critical word first[[[Request missed word from memory first, send to proc as soon as it arrives]]]Early restart[[[Request words in normal order, send missed word to proc as soon as it arrives]]]Compiler blocking[[[Subdivide matrices into blocks, more memory access but improves spatial locality]]]Hardware prefetch[[[Fetch next sequential block, spatial locality]]]Compiler prefetch[[[Compiler inserts prefetch instructions]]]Nonblocking cache[[[A cache that allows the processor to make references to the cache while the cache is handling an earlier miss]]]Cycle time[[[Time between starting memory accesses]]]SRAM[[[Static RAM
  Used for cache
  Low power
  6 transistors per bit
  Transistors and latches]]]DRAM[[[Dynamic RAM
  Rewrite after read
  Refresh every 8ms
  6 transistors per bit
  Access strobe, upper half row (RAS), lower half column (CAS)
  Cheaper
  Transistors and capacitors]]]DDRs[[[Voltage goes down
  Frequency goes up]]]GDDR5[[[Based on DRR3
  2-5x bandwidth
  Wider interface (32 vs 16 bit)
  Higher clock rate as soldered vs socketed]]]Flash memory[[[Type of EEPROM
  Erase before write
  Non volatile
  Limited write cycles
  Cheaper than SDRAM, slower than SRAM]]]SDRAM[[[Synchronized DRAM
  Access on both falling and rising edge of clock cycle]]]Soft memory errors[[[Dynamic
  Detected and fixed via ECC]]]Hard memory errors[[[Permanent
  Use sparse rows to replace defective ones]]]Chipkill[[[ECC, raid-like]]]Virtual memory[[[Separate address spaces
  Protects processes by keeping them in their own address space]]]Loop level parallelism[[[Unroll loops
  Use SIMD]]]Antidependence[[[\`i\` reads from location \`j\` later writes to
  Must preserve order]]]Output dependence[[[\`i\` and \`j\` write to same place
  Must preserve order]]]Control dependence[[[Cannot move instruction before branch if it depends on the branch (e.g. branch condition limits when it should run)]]]Tomasulo's Algorithm[[[Track when operands are available
  Does register renaming in hardware, minimizing WAR/WAW
  FIFO queue for RS]]]Reorder buffer[[[The buffer that holds results in a dynamically scheduled processor until it is safe to store the results to memory or a register]]]VLIW[[[Very Long Instruction Word
  Package multiple operations into one instruction]]]Branch folding[[[For larger branch target buffer
  Add actual instruction to the branch instead of just branch address
  Reduce CPI]]]Return address predictor[[[Most unconditional branches come from function return
  Predict where return will go]]]Integrated Instruction Fetch Unit[[[Monolithic unit that performs branch prediction, instruction prefetch, instruction memory
  Access and buffering]]]CPU simulator[[[Simulate just CPU]]]Microarchitecture simulator[[[Simulate cache, dynamic instruction translation]]]Full-system simulator[[[Simulate everything, deal with IO]]]SOC simulator[[[Simulate SOC, CPU/GPU/IO/etc]]]Full cycle-accurate simulator[[[Simulate everything]]]Instruction set/functional simulator[[[Simulate functionality but not exactly]]]Sampling[[[Statistical simulation
  Tries to improve speed
  Only fully simulate small part]]]Warming problem[[[Restart full cycle accurate simulation after running in functional mode]]]Checkpointing[[[High level, cache and dir tags, complete memory data
  Low level, registers, TLB, BP, cache tags, touched memory
  Both]]]Power model[[[Not cycle accurate
  Use a model and empirical experimentation]]]PLD[[[Programmable Logic Devices
  Connect with global interconnect matrix]]]CLB[[[Configurable Logic Block
  Use in mesh
  Each performs logical function (e.g. XOR/AND)
  Switches programmed to connect CLBs]]]LUT[[[Lookup table
  Bits set to define logic function
  Output stored in flip flop or used as other LUT]]]Logic synthesis[[[Transform HDL into netlist]]]Netlist[[[Description of circuit connections]]]Translator[[[Merges multiple netlists]]]Mapper[[[Combine gates in netlist to fit into available LUT structure]]]Place and route[[[Assign LUT groups to real locations
  Assign connections on switching matrix]]]Convoy[[[Set of vector instructions that could execute together]]]VLR[[[Vector Length Register
  Use strip mining]]]Vector mask register[[[Boolean vector register to disable certain elements]]]Scatter gather[[[Use contents of auxiliary vector to select which elements of main vector should be used]]]Chaining[[[Allow dependent instructions to execute as soon as the result of the previous instruction is available
  Requires multiple functional units as same unit cannot be used back to back]]]Memory banks[[[Must support high bandwidth for vector loads and stores
  Spread accesses across multiple banks
  Successive data stored in successive banks]]]Threads and banks[[[Threads associated with each data element, organized into blocks
  Blocks organized into grids]]]OpenCL[[[C-like language, targets heterogeneous hardware]]]Platform model[[[Host/device relationship
  Defines abstract hardware model
  Functions called kernels
  Divided into compute units into processing elements]]]Execution model[[[How OpenCL is configured and kernels are executed
  Sets up context on host
  Allows interaction
  Defines concurrency model]]]Memory model[[[Independent from underlying memory, closely resembles GPU architecture]]]Programming model[[[How the concurrency model is mapped to physical hardware]]]Concurrency model[[[Hierarchy model of work groups and work items
  Very scalable
  Kernels specified in n-dimensional range (ND-Range), corresponds to dimensionality of input or output space]]]Barrier synchronisation[[[Performed by work items in work group]]]Thread structure[[[Each thread computes one part of problem
  Similar structure to data]]]OpenCL memory types[[[Global - access by everything
  Constant - global read only
  Local - per work group
  Private - per work item
  Movement is explicit]]]Bus addressing[[[Wide bus, wider than data size
  Given desired address, mask LSB until aligned with bus width
  Get back useful and wasted data]]]Coalescing[[[Combine memory accesses to reduce wasted bytes
  Possible when threads access memory inside of bus width range
  AMD Wavefront, NVIDIA Warp]]]Bank conflicts[[[Largest negative effect on local memory operatoins
  Wavefront stalls until finished]]]Divergent control flow[[[Divergent is when for example all even items execute code
  Non divergent is when for example first half of items execute code]]]Task parallelism[[[Distribution of independent (though sometimes communicating) processes]]]Data parallelism[[[Different data, multiple processing units, some/similar operations performed]]]OpenMP[[[Shared memory, loop based parallelism
  Abstraction on top of threads
  If no dependencies, run loop in parallel]]]MPI[[[Message passing interface
  Good for distributed memory, high overhead for shared memory]]]PGAS[[[Partitioned global address space
  Abstraction of distributed memory
  All memory presented as stored]]]SMT[[[Simultaneous multithreading (hyperthreading)
  Increase performance by filling up processing time lost to memory latency
  If one thread stalls, switch to other one]]]Pareto front[[[Evaluate multi dimensional inputs]]]Thread level parallelism[[[MIMD, multiple PCs
  Tightly coupled shared memory multiprocessors]]]SMP[[[Symmetric multiprocessors
  Small number of cores, share single memory, uniform latency]]]DSM[[[Distributed shared memory among processors
  Non uniform memory access (NUMA) latency
  Processes connected by direct (switched) and indirect (multihop)]]]Coherence[[[Reads must return most recently written value
  Coherence defines what values can be returned by a read
  Consistency determines when a written value will be returned by a read]]]Snoopy coherence[[[Every cache that has a copy of the data tracks the sharing status of the block
  Monitors broadcast medium (e.g. bus)]]]Soft application[[[100% accuracy not required
  Image compression, processing, ML, etc]]]Approximate computing[[[Exploit gaps between level of accuracy required/provided in order to achieve optimizations
  Hard to identify, use pragma like OpenMP or automatically find using mutation testing]]]Precision scaling[[[Dynamically vary precision of FP numbers
  Find min precision required at design time]]]Loop perforation[[[Skip some iterations of loops]]]Load value approximation[[[On cache miss, predict contents, no stall]]]Memorization[[[Cache function calls with same inputs if pure]]]Set associative cache[[[Cache contains sets
  Sets contain blocks
  Blocks mapped to set, placed anywhere within set]]]n-way set associative[[[n blocks in a set]]]Direct mapped cache[[[One block per set
  Block always placed in same location]]]Fully associative cache[[[Only one set, blocks anywhere in set]]]Superscalar[[[Multiple functional units or multiple cores
  End up doing more than 1 IPC]]]Chime[[[Unit of time taken to execute one convoy
  m convoys executes in m chimes; for vector length n, approximately m*n cycles]]]Strip mining[[[Ensure each vector operation is done in size less than or equal to MVL (maximum vector length)]]]Stride[[[Distance separating elements to be gathered into a single register
  Access nonsequential memory locations to reshape into dense structures]]]Write serialization[[[Ensuring all writes to the same location are seen in the same order]]]Directory based cache[[[Sharing status of memory block kept in one location]]]Exclusive access cache[[[No other readable or writeable copies of an item exist when the write occurs
  All other cached copies are invalidated]]]Data hazard[[[Occurs when dependence results in incorrect execution
`;

export const cards = cardStr
  .trim()
  .split("]]]")
  .map(c => c.split("[[[").map(c => c.trim()));
