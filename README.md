# Linear CAB Dispatcher

This is just something I'm playing with

## Process

1. Define set of assumptions about the data
   - All builds are associated with tickets
   - One build, one ticket
   - All tickets have a clearly defined (ie regex-parseable) section that lists tickets either by ID or by URL
   - Approvals are done by specific people
   - Approvals are done using a standard format in comments made by approvers
   - Simplest data setup for approvals is a key-value store where the keys are the ticket IDs and the value is TRUE if the ticket is approved
   - Also need a map from team that holds super tickets to the tickets it approves
2. Create parser to walk all current items to build the cache
   1. Take important input:
      - The team with some configuration (eg include archived)
      - The approvers (need to be well defined in Linear terms)
      - The comment format
   2. Walk all tickets in the team being careful to avoid rate-limiting
   3. Build the cache
      1. Create the map cache
      2. Create the approval cache
3. Create webhook to listen to new events
   1. If super ticket, create/update map cache
   2. If comment on super ticket, check for approver and approval format
   3. If neither super ticket nor comment on super ticket, do nothing.
