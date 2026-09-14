# Dell 7740: BT missing = dead combo card, not BIOS/driver; cctk read/toggle workflow

### Context

Dell Precision 7740 (2026-08-18): user wanted Bluetooth fixed (earbuds). Found: WiFi = Intel Dual Band Wireless-AC 8260 (aftermarket module), and NO Bluetooth radio enumerates anywhere in Windows - no Bluetooth class devices (present or hidden), no VID_8087 Intel BT USB device, no unknown devices, clean elevated pnputil rescan.

### Explanation

The Bluetooth control is BIOS-enabled (cctk 5.2.2 read WirelessSwitchBluetoothCtrl=Enabled), BTHUSB/BTHPORT drivers and bthserv are healthy, yet the radio never enumerates - the 8260 module's BT half is dead or absent at hardware level. Dell tooling: Dell Command | Configure 5.2.2 (driver ID F2V9N, direct URL pattern https://dl.dell.com/FOLDER14333137M/1/Dell-Command-Configure-Application_F2V9N_WIN64_5.2.2.292_A00.EXE) installs to C:\Program Files (x86)\Dell\Command Configure\X86_64\cctk.exe; silent install is /s /f /l=path (DUP flags, NOT /v/qn); the BT master switch option on this platform is WirelessSwitchBluetoothCtrl (Enabled/Disabled). dl.dell.com blocks bare curl - needs browser User-Agent + Referer headers.

### Alternatives

1) USB BT 5.0 dongle - instant, zero chassis work. 2) M.2 swap to genuine Intel AX210 - full WiFi 6E + BT 5.3. 3) Reinstalling drivers - pointless, no unknown device exists. 4) BIOS toggle via cctk - done and verified already Enabled.

### Rationale (Why this?)

All evidence consistent: BIOS enabled + healthy driver stack + zero enumeration = hardware fault of the combo module, not software. Revisit if a replacement card is installed - expect VID_8087 USB device for Intel or 0CF3 for Qualcomm cards.

### Exercises

1) Diagnose a missing radio: Get-PnpDevice -Class Bluetooth (all states), USB enum for the card's VID, elevated pnputil /scan-devices. 2) Read Dell BIOS settings from Windows: cctk --OptionName; verify with exit code 0. 3) After installing a dongle/card, re-run Get-PnpDevice -Class Bluetooth and pair. 4) Use cctk --help to enumerate exact option names per platform.

### Next Steps

User picks USB dongle or M.2 AX210 swap. Dell Command Configure 5.2.2 remains installed for future BIOS-level tasks. Related: memory/patterns/opencode-anywhere-path.md, patterns/windows-profile-migration.md.

---
