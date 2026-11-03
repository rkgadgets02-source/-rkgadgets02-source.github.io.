# PackCheck

A phone app for packing online orders. It scans the shipping label, checks every product goes into the box, and tracks your sales and estimated earnings.

It works with **Amazon, Flipkart, Meesho and Shopify** orders. It runs in Chrome, can be installed on Android (from your website or from the Play Store), and works without internet once it is set up. All data stays on the phone. See the [privacy policy](privacy.html).

---

## What it does

| Tab | What you do there |
|---|---|
| **Pack** | Scan the label's AWB barcode, take a photo of the Order ID, or type the order number. Then scan or tick each product. A red warning means something is missing or wrong. A green **Fully packed** means the box is complete. |
| **Orders** | Import your orders file. See orders to pack, packed orders, or all orders, and filter by marketplace. |
| **Revenue** | Totals for today and this month, packed vs pending counts, and estimated earnings after the fee % you set for each SKU. |
| **History** | Every packed order with its date and value. **Export as CSV** for Excel or Google Sheets. |
| **More** | Backup and restore, saved product barcodes, privacy policy, and deleting all data. |

---

## Files in this folder

Upload **all** of these together. The app does not work if any are missing.

| File | What it is |
|---|---|
| `index.html` | The app itself |
| `privacy.html` | The privacy policy page |
| `sw.js` | Lets the app work offline and offers updates |
| `manifest.json` | Lets Android install it as an app |
| `icon-192.png`, `icon-512.png` | The app icon |
| `vendor/` | Free libraries: barcode scanning, text reading and Excel reading |
| `.well-known/assetlinks.json` | Proves to Android that your Play Store app owns this website (fill in before publishing) |
| `.nojekyll` | An empty file. It makes GitHub Pages serve the `.well-known` folder |
| `README.md` | This guide |

Files whose names start with a dot (`.nojekyll`, `.well-known`) are hidden on some computers and can be skipped when you drag files to GitHub. Create them on GitHub directly instead; see [step 4 below](#put-it-online-free-one-time).

---

## Put it online (free, one time)

The phone camera only works when the app is opened from a secure `https://` address, so the app needs to be hosted. GitHub Pages is free.

1. Go to **github.com** and create a free account.
2. Click **+** (top right) → **New repository**. For the **name**, type exactly **`YOUR-USERNAME.github.io`** (your own GitHub username). Choose **Public** and click **Create repository**.
   This puts the app at the main address of your site, which the Play Store needs. If you never plan to publish on Play, any repository name works.
3. Click **uploading an existing file** (or **Add file → Upload files**). Open this folder on your computer, select **everything inside it** (including the `vendor` folder), drag it onto the page and click **Commit changes**.
4. Add the two hidden items by hand:
   - **Add file → Create new file**. Name it `.nojekyll`, leave it empty, and click **Commit changes**.
   - **Add file → Create new file**. Name it `.well-known/assetlinks.json` (typing the `/` makes the folder). Paste the contents of this folder's `.well-known/assetlinks.json` and click **Commit changes**.
5. Go to **Settings → Pages**. Under **Branch**, choose **main** and click **Save**.
6. After about 2 minutes your app is at **`https://YOUR-USERNAME.github.io/`**
   and the privacy policy is at **`https://YOUR-USERNAME.github.io/privacy.html`**.

Only the app goes on GitHub. Your orders and sales stay on your phone and are never uploaded.

---

## Install it on your Android phone (without the Play Store)

1. Open your app address in **Chrome** on the phone.
2. Tap **⋮** (top right) → **Add to Home screen** or **Install app**.
3. Open **PackCheck** from the home screen and tap **Allow** when it asks for the camera.
4. Go to **More**. When it says **Ready to work offline**, the app works without internet.

---

## Daily use

### 1. Import your orders

Download your orders file from the seller panel, then in the app tap **Orders → Import orders file**.

| Marketplace | Where to download |
|---|---|
| Amazon | Seller Central → Reports → Fulfilment → **All Orders** (.txt file) |
| Flipkart | Seller Hub → Orders → download your orders (Excel or CSV) |
| Meesho | Supplier Panel → Orders → download orders (CSV) |
| Shopify | Orders → **Export** → CSV |

- The app works out which marketplace the file is from.
- After importing, it shows which column it took the price from. **Check one order against your seller panel the first time.**
- Importing the same file again is safe. Packed orders stay packed and are not counted twice.
- Import the file **exactly as downloaded**. Opening and saving it in Excel first can damage long order numbers (they turn into something like `1.06893E+17`).

### 2. Find the order for a label

On **Pack**, choose one:
- **Scan shipping label** — scans the AWB barcode. If the order was already linked to that AWB, or your Flipkart file had the Tracking ID, the order opens straight away.
- **Take photo of Order ID** — the app reads the order number from the photo. Use good light and fill the screen with the label.
- **Type it** — the full order ID, its **last 5 digits**, or a Shopify number like `1001`. If more than one order ends in those digits, the app shows a list to choose from.

### 3. Pack and check

- Tap **Scan product barcode** and show each product to the camera, or tap **Tick 1 packed**.
- The **first time** you scan a product's barcode, the app asks which product it is, then asks you to confirm: **Save this barcode as …?** Tap **Yes, save**, or **Choose again** if you picked the wrong one. After that it recognises the product automatically. You can remove a saved barcode under **More**.
- Tap **Check and finish** to see in red anything still missing.
- When everything is in, you see a green **Fully packed**. Tap **Scan next label** to continue.

### Warnings you may see

| Warning | Meaning |
|---|---|
| 🔴 **WRONG ITEM** | This product is not in the order. Take it out. |
| 🔴 **EXTRA ITEM** | You already packed enough of this product. |
| 🔴 **MISSING … ITEM(S)** | Items still need to go in the box. |
| 🔴 **ALREADY PACKED** | This order was packed before. Don't ship it twice. |
| 🔴 **CANCELLED: DO NOT SHIP** | The order was cancelled. |
| 🔴 **Packed, then cancelled** | Cancelled after you packed it. Pull the parcel out. |
| 🟠 **Payment pending** | Amazon still shows Pending. Wait before shipping. |
| 🟠 **Amazon ships this order** | An FBA order. You probably don't need to pack it. |
| 🟠 **Back up your data** | No backup in the last day. Tap **Download backup**. |
| 🟢 **New version available — tap to update** | An update is ready. Tap it to switch now. Your data is kept. |

### 4. Revenue and fees

- On **Revenue**, enter the approximate marketplace fee % for each SKU. Each marketplace has its own list, because fees differ.
- Use the store buttons to see one marketplace or all of them together.
- **By order date** counts orders by when they were placed. **By packed date** counts only orders you packed, by when you packed them.
- **Estimated net** is only the order value minus your fee %. It does **not** include closing fees, shipping fees, GST or your product cost, so your real earnings will be lower.

---

## Keep your data safe — back up every day

Your data lives **only on your phone**. Clearing the app's data, uninstalling it or changing phones erases it. Nobody, including us, has a copy.

- **Every day**, tap **Download backup** (on the Pack tab reminder, or under **More**) and save the file to Google Drive.
- The Pack tab reminds you whenever your last backup is more than a day old.
- On a new phone, go to **More → Restore from backup**.
- The app asks the phone to protect its storage from automatic clearing. **More** shows whether the phone agreed.

---

## Updating the app

1. Upload the changed files to GitHub the same way. GitHub replaces the old ones.
2. In `sw.js` on GitHub, click the pencil icon, raise the number in `packcheck-v5` (for example to `packcheck-v6`), and commit. This makes sure every file updates together.
3. Within a few minutes, open phones show **New version available — tap to update**. Tapping it switches to the new version. Your data is kept.

The Play Store app shows your website, so website updates reach Play users too. You only need a new Play release to change the app's name, icon or package settings.

---

## Publishing to the Play Store

PackCheck goes on Play as a **Trusted Web Activity**: a small Android app that opens your website full screen.

### Before you start
- The app must be at the **main address** of your site: the repository is named **`YOUR-USERNAME.github.io`**, or you use your own domain. `assetlinks.json` must open at `https://YOUR-SITE/.well-known/assetlinks.json`. Check that link in Chrome.
- A **Google Play Console** developer account (one-time US$25 fee).
- Your privacy policy link: `https://YOUR-SITE/privacy.html`.

### 1. Build the app with PWABuilder
1. Go to **pwabuilder.com**, enter your site address and click **Start**.
2. Click **Package for stores → Android → Generate package**. In **Options**:
   - **Package ID**: choose one and never change it, for example `com.rkbazaar.packcheck`.
   - **App name**: `PackCheck`. Set **Version code** `1` and **Version name** `1.0.0`.
   - **Signing key**: **Create new**. Fill in your name and organisation.
3. Download the zip. It contains:
   - the **`.aab`** file, which you upload to Play;
   - **`signing.keystore`** and **`signing-key-info.txt`** (the key and its passwords);
   - an **`assetlinks.json`** containing your Package ID and your *upload key* fingerprint.

### 2. Keep the signing key safe
Save the whole zip, especially `signing.keystore` and `signing-key-info.txt`, in **two safe places** (for example Google Drive and a USB drive). Every future update must be signed with this key. Never share it or upload it to GitHub. If it is lost, you must ask Google support to reset it, which takes time.

### 3. Create the app in Play Console
1. **Create app**: name `PackCheck`, App, Free.
2. Fill in **App content**:
   - Privacy policy: your `privacy.html` link.
   - Data safety: the app **does not collect or share any user data**.
   - Ads: no ads.
   - Fill in the remaining forms: target audience (adults, not children), content rating questionnaire, and category (Business).
3. Store listing: description, icon (`icon-512.png`), and phone screenshots taken from the app.
4. Upload the `.aab` to a **testing track**. Play App Signing is turned on automatically.

### 4. Fill in `assetlinks.json`
Open `.well-known/assetlinks.json` on GitHub (pencil icon) and replace:

| Placeholder | Where to find the value |
|---|---|
| `REPLACE_WITH_PACKAGE_ID` | The **Package ID** you chose in PWABuilder, for example `com.rkbazaar.packcheck` |
| `REPLACE_WITH_PLAY_APP_SIGNING_KEY_SHA256` | Play Console → your app → **Test and release → App integrity → App signing** (on some screens: **Setup → App signing**) → **App signing key certificate** → **SHA-256 certificate fingerprint** |
| `REPLACE_WITH_UPLOAD_KEY_SHA256_FROM_PWABUILDER` | The fingerprint in the `assetlinks.json` from the PWABuilder zip (also shown on the same Play page as **Upload key certificate**) |

Fingerprints look like `AB:CD:12:…` (32 pairs). Copy them exactly. Play Console's App signing page also offers a ready-made **Digital Asset Links JSON** you can compare against.
Commit, wait 2 minutes, then open `https://YOUR-SITE/.well-known/assetlinks.json` to check it shows your values.

If assetlinks is wrong or missing, the app still opens, but with a Chrome address bar at the top. That is how you can tell it needs fixing.

### 5. Closed test (new personal accounts)
Google requires new **personal** developer accounts to run a **closed test with at least 12 testers who stay opted in for 14 days in a row** before you can apply for production. Add testers by email in **Testing → Closed testing**, share the opt-in link, and ask them to install and keep the app. After 14 days, apply for **production access** from the Dashboard.

---

## Try it on a computer

Double-click **`Start PackCheck.bat`**, which is kept next to this folder on the PC, not uploaded. It opens **http://localhost:8080/** in your browser. Keep the black window open while you use it.

On a computer you can import files, type order numbers, tick items and see revenue. Data saved on the computer is separate from your phone; use backup and restore to move it.

---

## Known limits

- Product barcodes are not in any marketplace's order file, so the app learns each barcode the first time you scan it.
- Reading the Order ID from a photo depends on light and focus. Typing it always works.
- Order files can change when a marketplace updates its website. If an import fails or a price looks wrong, the column names may have changed.
- Data is stored in the phone's app storage (IndexedDB), which holds far more than the app needs. Older versions used a smaller store; the app moves that data across automatically the first time it opens.

---

## Free libraries used

All are free and open source (Apache License 2.0):
- [html5-qrcode](https://github.com/mebjas/html5-qrcode) 2.3.8 — barcode scanning
- [Tesseract.js](https://github.com/naptha/tesseract.js) 5.1.1 with English language data — reading text from label photos
- [SheetJS Community Edition](https://sheetjs.com) 0.20.3 — reading Excel files
