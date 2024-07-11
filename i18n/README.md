## Localization

[![Crowdin](https://badges.crowdin.net/wuwatracker/localized.svg)](https://crowdin.com)

We need more translators to help us translate the rest of the pages.

> [!NOTE]
> These initial langauges are based on the top countries that use our application as of the time of writing this.

### Available Languages

| Filename   | Country         | Language Name       | ISO Code |
| ---------- | --------------- | ------------------- | -------- |
| de.json    | Germany         | German              | de       |
| en.json    | United States   | English             | en       |
| es.json    | Spain           | Spanish             | es       |
| fr.json    | France          | French              | fr       |
| id.json    | Indonesia       | Indonesian          | id       |
| in.json    | India           | Hindi               | hi       |
| ja.json    | Japan           | Japanese            | ja       |
| ko.json    | South Korea     | Korean              | ko       |
| ms.json    | Malaysia        | Malay               | ms       |
| pt.json    | Portugal/Brazil | Portuguese          | pt       |
| ru.json    | Russia          | Russian             | ru       |
| th.json    | Thailand        | Thai                | th       |
| uk.json    | Ukraine         | Ukrainian           | uk       |
| vi.json    | Vietnam         | Vietnamese          | vi       |
| zh_CN.json | China           | Simplified Chinese  | zh_CN    |
| zh_TW.json | China           | Traditional Chinese | zh_TW    |

### We Need Your Help!

If you want to translate for your language or make any corrections, please join our [Discord Server](https://discord.gg/mADnEXwZGT) and apply in the `#staff-application` text channel or fork this repository before making a [Pull Request here](https://github.com/Luzefiru/wuwatracker/compare).

#### Recommended Workflow

I recommend you use a text-editor like [Visual Studio Code](https://code.visualstudio.com/download) to help you select multiple values at the same time. For example highlighting text and pressing `CTRL+D` will select the next occurence, or `CTRL+SHIFT+L` will select all occurences which you can edit at the same time.

Next, you [fork this repository](https://github.com/Luzefiru/wuwatracker/fork) and open the `lang.json` file you want to edit with VSCode.

Afterwards, the actual editing flow looks like this:

1. You'll have the original English translations laid out like this with the "key" on the left corresponding to the "translation value" on the right:

```json
"SharePageContent": {
  "title": "Share Card",
  "description": "Customize and download your Wuthering Waves Convene history to share it with others!",
  "Edit Share Card": "Edit Share Card",
  "recommendation": "We recommend 1:1 aspect ratio for images at 2048x2048 resolution.",
  "Download": "Download"
}
```

2. So, if I were to translate this to another language, I'll simply substitute the "translation values" on the right while keeping the "keys" intact:

```json
"SharePageContent": {
  "title": "Ibahagi ang Card",
  "description": "I-customize at i-download ang iyong kasaysayan ng Convene sa Wuthering Waves upang maibahagi ito sa iba!",
  "Edit Share Card": "I-edit ang Ibahaging Card",
  "recommendation": "Inirerekumenda namin ang 1:1 na aspect ratio para sa mga larawan sa 2048x2048 na resolution.",
  "Download": "I-download"
}
```

3. Once you're done, save the file and proceed to [open Pull Request here](https://github.com/Luzefiru/wuwatracker/compare)!

### Have Questions?

Please join our [Discord Server](https://discord.gg/mADnEXwZGT) and apply in the `#staff-application` text channel so that we can give you the `@Translator` role. You'll have access to a channel with other translators so that you can ask any questions or request for assistance.
