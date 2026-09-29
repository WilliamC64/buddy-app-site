document.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainApp = document.getElementById('main-app');
  const startBtn = document.getElementById('start-btn');
  const grid = document.getElementById('buddy-grid');
  const selectedPanel = document.getElementById('selected-panel');
  const selectedInfo = document.getElementById('selected-buddy-info');
  const downloadBtn = document.getElementById('download-btn');
  const successOverlay = document.getElementById('success-overlay');
  const successMessage = document.getElementById('success-message');
  const doneBtn = document.getElementById('done-btn');
  const loadNote = document.getElementById('load-note');
  const truckerCard = document.getElementById('trucker-card');
  const customNameInput = document.getElementById('custom-name-input');
  const originSelect = document.getElementById('origin-select');
  const livesInUSBox = document.getElementById('lives-in-us');
  const ethnicityOptionsBox = document.getElementById('ethnicity-options');
  const ethnicityNote = document.getElementById('ethnicity-note');
  const personalitySection = document.getElementById('personality-section');
  const personalitySliders = document.getElementById('personality-sliders');
  const personalityResetBtn = document.getElementById('personality-reset');
  const postDownloadActions = document.getElementById('post-download-actions');
  const changePersonalityBtn = document.getElementById('change-personality-btn');
  const overlayChangePersonalityBtn = document.getElementById('overlay-change-personality-btn');
  const saveUpdatedBtn = document.getElementById('save-updated-btn');
  const saveStatus = document.getElementById('save-status');
  const presetButtonsBox = document.getElementById('preset-buttons');
  const customPresetButtonsBox = document.getElementById('custom-preset-buttons');
  const customPresetsLabel = document.getElementById('custom-presets-label');
  const presetIndicatorName = document.getElementById('preset-indicator-name');
  const savePresetBtn = document.getElementById('save-preset-btn');
  const savePresetForm = document.getElementById('save-preset-form');
  const presetNameInput = document.getElementById('preset-name-input');
  const presetNameSaveBtn = document.getElementById('preset-name-save');
  const presetNameCancelBtn = document.getElementById('preset-name-cancel');
  const presetError = document.getElementById('preset-error');
  const rolePlaySection = document.getElementById('roleplay-section');
  const rolePlayToggle = document.getElementById('roleplay-toggle');
  const rolePlayStatus = document.getElementById('roleplay-status');
  const rolePlayBody = document.getElementById('roleplay-body');
  const scenarioListBox = document.getElementById('scenario-list');
  const customScenarioListBox = document.getElementById('custom-scenario-list');
  const customScenariosLabel = document.getElementById('custom-scenarios-label');
  const customScenarioBtn = document.getElementById('custom-scenario-btn');
  const customScenarioForm = document.getElementById('custom-scenario-form');
  const customScenarioTitle = document.getElementById('custom-scenario-title');
  const customScenarioSetting = document.getElementById('custom-scenario-setting');
  const customScenarioRole = document.getElementById('custom-scenario-role');
  const customScenarioUserRole = document.getElementById('custom-scenario-user-role');
  const customScenarioSave = document.getElementById('custom-scenario-save');
  const customScenarioCancel = document.getElementById('custom-scenario-cancel');
  const customScenarioError = document.getElementById('custom-scenario-error');
  const scenarioDetails = document.getElementById('scenario-details');
  const scenarioSummary = document.getElementById('scenario-summary');
  const learnLinesList = document.getElementById('learn-lines');
  const learnLinesNote = document.getElementById('learn-lines-note');
  const playAllLinesBtn = document.getElementById('play-all-lines');
  const studySection = document.getElementById('study-section');
  const studyToggle = document.getElementById('study-toggle');
  const studyStatus = document.getElementById('study-status');
  const studyBody = document.getElementById('study-body');
  const questionnaireForm = document.getElementById('questionnaire-form');
  const questionnaireFields = document.getElementById('questionnaire-fields');
  const questionnaireSave = document.getElementById('questionnaire-save');
  const questionnaireSkip = document.getElementById('questionnaire-skip');
  const questionnaireError = document.getElementById('questionnaire-error');
  const questionnaireSummary = document.getElementById('questionnaire-summary');
  const questionnaireAnswers = document.getElementById('questionnaire-answers');
  const questionnaireRetake = document.getElementById('questionnaire-retake');
  const subjectListBox = document.getElementById('subject-list');
  const customTopicListBox = document.getElementById('custom-topic-list');
  const customTopicsLabel = document.getElementById('custom-topics-label');
  const customTopicBtn = document.getElementById('custom-topic-btn');
  const customTopicForm = document.getElementById('custom-topic-form');
  const customTopicTitle = document.getElementById('custom-topic-title');
  const customTopicGoal = document.getElementById('custom-topic-goal');
  const customTopicSave = document.getElementById('custom-topic-save');
  const customTopicCancel = document.getElementById('custom-topic-cancel');
  const customTopicError = document.getElementById('custom-topic-error');
  const subjectDetails = document.getElementById('subject-details');
  const subjectSummary = document.getElementById('subject-summary');
  const practicePromptsList = document.getElementById('practice-prompts');
  const playAllPracticeBtn = document.getElementById('play-all-practice');
  const exciteBtn = document.getElementById('excite-btn');
  const exciteLevelsBox = document.getElementById('excite-levels');
  const exciteLine = document.getElementById('excite-line');
  const exciteBurst = document.getElementById('excite-burst');

  if (typeof buddies === 'undefined') {
    if (loadNote) {
      loadNote.textContent = 'Buddy data did not load. Open index.html from inside the Buddy-app folder (js/buddies.js must sit next to js/app.js).';
      loadNote.classList.remove('hidden');
    }
    return;
  }

  let currentBuddy = null;
  let currentAudio = null;
  let currentGenFilter = 'all';
  let currentRegionFilter = 'all';
  let currentInterestFilter = 'all';

  const MAX_NAME_LENGTH = 40;
  const originList = (typeof origins !== 'undefined' && Array.isArray(origins)) ? origins : [
    { id: 'us', label: 'United States', demonym: 'American', langs: ['en-US'], rate: 1, pitch: 1, phrases: '' }
  ];
  const ethnicityList = (typeof ethnicityOptions !== 'undefined' && Array.isArray(ethnicityOptions)) ? ethnicityOptions : [];

  // The Trucker: welcome-screen voice card (plays voices/trucker.mp3 via playVoice).
  const truckerBuddy = {
    id: 'trucker',
    name: 'The Trucker',
    generation: 'mid',
    role: 'Long-Haul Trucker',
    region: 'On the road',
    accent: 'Warm American',
    interests: ['trades'],
    voiceLine: "Hey there. I'm The Trucker. Long roads, good company, and I'll ride along with you every mile.",
    bio: 'Rides shotgun on the long haul.'
  };

  if (truckerCard) {
    truckerCard.addEventListener('click', () => playVoice(truckerBuddy));
  }

  // ---------- Personality builder ----------
  // Slider position 0–100: 0 = fully the left trait, 100 = fully the right trait, 50 = balanced.
  const PERSONALITY_DEFAULT = 50;
  const personalityTraits = [
    {
      key: 'outgoingChill', left: 'Outgoing', right: 'Chill',
      leftGuide: 'starts conversations, asks follow-up questions, and shares stories and enthusiasm',
      rightGuide: 'lets the user lead, is comfortable with quiet moments, and keeps replies relaxed and short',
      leftPhrase: 'Oh hey, so good to meet you!', rightPhrase: 'Hey. No rush.'
    },
    {
      key: 'businessLaidBack', left: 'Business-sharp', right: 'Laid-back',
      leftGuide: 'stays focused and organized, gets to the point, and offers clear next steps',
      rightGuide: 'keeps things easygoing and informal, no pressure, takes things as they come',
      leftPhrase: "Alright, let's get to it.", rightPhrase: 'Hey, easy does it.'
    },
    {
      key: 'flirtySweet', left: 'Flirty', right: 'Sweet',
      leftGuide: 'is playful and charming with light, warm compliments and gentle teasing, always tasteful and respectful, never explicit, and only as far as the user is comfortable',
      rightGuide: 'is kind, gentle, and encouraging, affectionate in a wholesome, supportive way',
      leftPhrase: 'Well, hi there.', rightPhrase: 'Aw, hi friend.'
    },
    {
      key: 'energeticCalm', left: 'Energetic', right: 'Calm',
      leftGuide: 'is upbeat and enthusiastic with a quick, lively pace',
      rightGuide: 'is steady, soothing, and unhurried, a grounding presence',
      leftPhrase: 'Hey hey!', rightPhrase: 'Take a breath. Hi.'
    },
    {
      key: 'humorousSerious', left: 'Humorous', right: 'Serious',
      leftGuide: 'brings jokes, wit, and light banter when the moment fits',
      rightGuide: 'is sincere and thoughtful, stays on topic, and uses humor sparingly',
      leftPhrase: "Okay, don't laugh, but hi.", rightPhrase: "Hi. Let's talk."
    }
  ];

  function clampTrait(value) {
    const n = Math.round(Number(value));
    return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : PERSONALITY_DEFAULT;
  }

  function traitLean(trait, value) {
    const v = clampTrait(value);
    const toLeft = v < PERSONALITY_DEFAULT;
    const strength = toLeft ? 100 - v : v; // 50–100 toward the dominant pole
    const pole = toLeft ? trait.left : trait.right;
    let band = 'Balanced';
    if (strength > 85) band = 'Very';
    else if (strength > 70) band = 'Mostly';
    else if (strength > 55) band = 'Leans';
    return { value: v, strength, pole, band, balanced: band === 'Balanced', toLeft };
  }

  function readoutText(trait, value) {
    const lean = traitLean(trait, value);
    return lean.balanced ? `Balanced (${lean.value})` : `${lean.band} ${lean.pole} (${lean.strength})`;
  }

  function getPersonality() {
    const result = {};
    personalityTraits.forEach(trait => {
      const input = document.getElementById(`trait-${trait.key}`);
      result[trait.key] = input ? clampTrait(input.value) : PERSONALITY_DEFAULT;
    });
    return result;
  }

  function setPersonality(values) {
    personalityTraits.forEach(trait => {
      const input = document.getElementById(`trait-${trait.key}`);
      if (!input) return;
      const v = values && values[trait.key] !== undefined ? clampTrait(values[trait.key]) : PERSONALITY_DEFAULT;
      input.value = String(v);
      updateReadout(trait);
    });
  }

  function updateReadout(trait) {
    const input = document.getElementById(`trait-${trait.key}`);
    const out = document.getElementById(`trait-${trait.key}-readout`);
    if (!input) return;
    const text = readoutText(trait, input.value);
    input.setAttribute('aria-valuetext', text);
    if (out) out.textContent = text;
  }

  function buildPersonalitySliders() {
    if (!personalitySliders || personalitySliders.children.length) return;
    personalityTraits.forEach(trait => {
      const id = `trait-${trait.key}`;
      const row = document.createElement('div');
      row.className = 'personality-row';

      const top = document.createElement('div');
      top.className = 'personality-row-top';
      const label = document.createElement('label');
      label.htmlFor = id;
      label.textContent = `${trait.left} ↔ ${trait.right}`;
      const out = document.createElement('output');
      out.id = `${id}-readout`;
      out.className = 'personality-readout';
      out.htmlFor = id;
      top.appendChild(label);
      top.appendChild(out);

      const range = document.createElement('div');
      range.className = 'personality-range';
      const leftPole = document.createElement('span');
      leftPole.className = 'pole pole-left';
      leftPole.setAttribute('aria-hidden', 'true');
      leftPole.textContent = trait.left;
      const input = document.createElement('input');
      input.type = 'range';
      input.id = id;
      input.min = '0';
      input.max = '100';
      input.step = '1';
      input.value = String(PERSONALITY_DEFAULT);
      input.dataset.trait = trait.key;
      input.setAttribute('aria-describedby', `${id}-readout`);
      const rightPole = document.createElement('span');
      rightPole.className = 'pole pole-right';
      rightPole.setAttribute('aria-hidden', 'true');
      rightPole.textContent = trait.right;
      range.appendChild(leftPole);
      range.appendChild(input);
      range.appendChild(rightPole);

      row.appendChild(top);
      row.appendChild(range);
      personalitySliders.appendChild(row);
      updateReadout(trait);
    });
  }

  function personalityGuidance() {
    const values = getPersonality();
    return personalityTraits.map(trait => {
      const lean = traitLean(trait, values[trait.key]);
      if (lean.balanced) {
        return `Balanced between ${trait.left.toLowerCase()} and ${trait.right.toLowerCase()} (${lean.value}/100): adapts to the user's mood.`;
      }
      const guide = lean.toLeft ? trait.leftGuide : trait.rightGuide;
      return `${lean.band} ${lean.pole.toLowerCase()} (${lean.strength}/100): ${guide}.`;
    }).join(' ');
  }

  function dominantTraitPhrase() {
    const values = getPersonality();
    let best = null;
    personalityTraits.forEach(trait => {
      const lean = traitLean(trait, values[trait.key]);
      if (lean.strength > 70 && (!best || lean.strength > best.lean.strength)) best = { trait, lean };
    });
    if (!best) return '';
    return best.lean.toLeft ? best.trait.leftPhrase : best.trait.rightPhrase;
  }

  // ---------- Per-buddy persistence (localStorage) ----------
  const STORAGE_PREFIX = 'buddy-settings-v1:';
  const LAST_BUDDY_KEY = 'buddy-last-id';

  function storageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
  }

  function collectSettings() {
    return {
      customName: getCustomName(),
      origin: originSelect ? originSelect.value : 'us',
      livesInUS: livesInUSBox ? livesInUSBox.checked : true,
      ethnicity: ethnicityOptionsBox
        ? Array.from(ethnicityOptionsBox.querySelectorAll('input:checked')).map(b => b.value)
        : [],
      personality: getPersonality(),
      personalityPreset: activePreset.name,
      personalityPresetType: activePreset.type,
      rolePlay: { active: rolePlayState.active, scenarioId: rolePlayState.scenarioId },
      studyBuddy: { active: studyState.active, subjectId: studyState.subjectId },
      excitement: { level: excitementLevel },
      savedAt: new Date().toISOString()
    };
  }

  function saveSettings() {
    if (!currentBuddy) return;
    storageSet(STORAGE_PREFIX + currentBuddy.id, JSON.stringify(collectSettings()));
    storageSet(LAST_BUDDY_KEY, currentBuddy.id);
  }

  function loadSettings(buddyId) {
    const raw = storageGet(STORAGE_PREFIX + buddyId);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function applySettings(settings) {
    if (!settings) return;
    if (customNameInput) customNameInput.value = cleanName(settings.customName);
    if (originSelect) {
      const known = originList.some(o => o.id === settings.origin);
      originSelect.value = known ? settings.origin : 'us';
    }
    if (livesInUSBox) livesInUSBox.checked = settings.livesInUS !== false;
    if (ethnicityOptionsBox) {
      const picked = Array.isArray(settings.ethnicity) ? settings.ethnicity : [];
      ethnicityOptionsBox.querySelectorAll('input[type="checkbox"]').forEach(box => {
        box.checked = picked.includes(box.value);
      });
    }
    setPersonality(settings.personality);
    restoreActivePreset(settings);
    restoreRolePlay(settings.rolePlay);
    restoreStudy(settings.studyBuddy);
    setExcitementLevel(settings.excitement && settings.excitement.level, false);
  }

  // ---------- Personality presets ----------
  // Values use the slider scale: LOW = left trait, HIGH = right trait.
  // Keys: outgoingChill (Outgoing↔Chill), businessLaidBack (Business-sharp↔Laid-back),
  // flirtySweet (Flirty↔Sweet), energeticCalm (Energetic↔Calm), humorousSerious (Humorous↔Serious).
  const CUSTOM_MIX = 'Custom Mix';
  const PRESET_STORAGE_PREFIX = 'buddy-presets-v1:';
  const MAX_CUSTOM_PRESETS = 8;
  const MAX_PRESET_NAME_LENGTH = 24;
  const builtInPresets = [
    { id: 'business', name: 'Business Mode', values: { outgoingChill: 40, businessLaidBack: 15, flirtySweet: 80, energeticCalm: 50, humorousSerious: 80 } },
    { id: 'flirty', name: 'Flirty Mode', values: { outgoingChill: 15, businessLaidBack: 70, flirtySweet: 25, energeticCalm: 40, humorousSerious: 20 } },
    { id: 'chill', name: 'Chill Mode', values: { outgoingChill: 85, businessLaidBack: 85, flirtySweet: 60, energeticCalm: 85, humorousSerious: 35 } },
    { id: 'energetic', name: 'Energetic Mode', values: { outgoingChill: 15, businessLaidBack: 60, flirtySweet: 50, energeticCalm: 10, humorousSerious: 20 } },
    { id: 'balanced', name: 'Balanced', values: { outgoingChill: 50, businessLaidBack: 50, flirtySweet: 50, energeticCalm: 50, humorousSerious: 50 } }
  ];

  // Active preset: { type: 'builtin' | 'custom' | 'custom-mix', name }
  let activePreset = { type: 'builtin', name: 'Balanced' };

  function normalizeValues(values) {
    const out = {};
    personalityTraits.forEach(trait => {
      out[trait.key] = values && values[trait.key] !== undefined ? clampTrait(values[trait.key]) : PERSONALITY_DEFAULT;
    });
    return out;
  }

  function valuesMatch(a, b) {
    return personalityTraits.every(trait => clampTrait(a[trait.key]) === clampTrait(b[trait.key]));
  }

  function cleanPresetName(raw) {
    return String(raw || '')
      .replace(/[\u0000-\u001F\u007F<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, MAX_PRESET_NAME_LENGTH)
      .trim();
  }

  function loadCustomPresets(buddyId) {
    if (!buddyId) return [];
    const raw = storageGet(PRESET_STORAGE_PREFIX + buddyId);
    if (!raw) return [];
    try {
      const list = JSON.parse(raw);
      if (!Array.isArray(list)) return [];
      const seen = new Set();
      return list
        .map(p => ({ name: cleanPresetName(p && p.name), values: normalizeValues(p && p.values), createdAt: p && p.createdAt }))
        .filter(p => {
          const key = p.name.toLowerCase();
          if (!p.name || seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .slice(0, MAX_CUSTOM_PRESETS);
    } catch (e) { return []; }
  }

  function saveCustomPresets(buddyId, list) {
    if (!buddyId) return;
    storageSet(PRESET_STORAGE_PREFIX + buddyId, JSON.stringify(list));
  }

  function currentCustomPresets() {
    return currentBuddy ? loadCustomPresets(currentBuddy.id) : [];
  }

  // Find a preset whose values equal the current sliders (built-ins first).
  function detectPreset(values) {
    const builtin = builtInPresets.find(p => valuesMatch(p.values, values));
    if (builtin) return { type: 'builtin', name: builtin.name };
    const custom = currentCustomPresets().find(p => valuesMatch(p.values, values));
    if (custom) return { type: 'custom', name: custom.name };
    return { type: 'custom-mix', name: CUSTOM_MIX };
  }

  function restoreActivePreset(settings) {
    const values = getPersonality();
    const savedName = settings && typeof settings.personalityPreset === 'string' ? settings.personalityPreset : '';
    const savedType = settings && settings.personalityPresetType;
    if (savedName === CUSTOM_MIX) {
      activePreset = { type: 'custom-mix', name: CUSTOM_MIX };
    } else {
      const pool = savedType === 'custom'
        ? currentCustomPresets().map(p => ({ type: 'custom', name: p.name, values: p.values }))
        : builtInPresets.map(p => ({ type: 'builtin', name: p.name, values: p.values }));
      const saved = savedName ? pool.find(p => p.name === savedName && valuesMatch(p.values, values)) : null;
      activePreset = saved ? { type: saved.type, name: saved.name } : detectPreset(values);
    }
    renderPresetState();
  }

  function setActivePreset(preset) {
    activePreset = preset;
    renderPresetState();
  }

  function renderPresetState() {
    if (presetIndicatorName) presetIndicatorName.textContent = activePreset.name;
    document.querySelectorAll('.preset-btn').forEach(btn => {
      const pressed = btn.dataset.presetType === activePreset.type && btn.dataset.presetName === activePreset.name;
      btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    });
  }

  function makePresetButton(preset, type) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'preset-btn';
    btn.textContent = preset.name;
    btn.dataset.presetType = type;
    btn.dataset.presetName = preset.name;
    if (preset.id) btn.dataset.presetId = preset.id;
    btn.setAttribute('aria-pressed', 'false');
    btn.title = personalityTraits.map(t => readoutText(t, preset.values[t.key])).join(' • ');
    btn.addEventListener('click', () => applyPreset(preset, type));
    return btn;
  }

  function buildPresetButtons() {
    if (!presetButtonsBox || presetButtonsBox.children.length) return;
    builtInPresets.forEach(preset => presetButtonsBox.appendChild(makePresetButton(preset, 'builtin')));
    renderPresetState();
  }

  function renderCustomPresets() {
    if (!customPresetButtonsBox) return;
    customPresetButtonsBox.innerHTML = '';
    const list = currentCustomPresets();
    list.forEach(preset => {
      const chip = document.createElement('span');
      chip.className = 'preset-chip';
      chip.appendChild(makePresetButton(preset, 'custom'));
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'preset-delete';
      del.textContent = '×';
      del.dataset.presetName = preset.name;
      del.setAttribute('aria-label', `Delete preset ${preset.name}`);
      del.title = `Delete ${preset.name}`;
      del.addEventListener('click', () => deleteCustomPreset(preset.name));
      chip.appendChild(del);
      customPresetButtonsBox.appendChild(chip);
    });
    if (customPresetsLabel) customPresetsLabel.classList.toggle('hidden', list.length === 0);
    if (savePresetBtn) {
      const full = list.length >= MAX_CUSTOM_PRESETS;
      savePresetBtn.disabled = full;
      savePresetBtn.textContent = full ? `Preset limit reached (${MAX_CUSTOM_PRESETS})` : '＋ Save as my preset';
      if (full) toggleSavePresetForm(false);
    }
    renderPresetState();
  }

  // One tap: set all five sliders, readouts, indicator, and save. Leaves name/origin/ethnicity untouched.
  function applyPreset(preset, type) {
    setPersonality(preset.values);
    setActivePreset({ type, name: preset.name });
    saveSettings();
  }

  function showPresetError(msg) {
    if (!presetError) return;
    presetError.textContent = msg || '';
    presetError.classList.toggle('hidden', !msg);
  }

  function toggleSavePresetForm(open) {
    if (!savePresetForm) return;
    savePresetForm.classList.toggle('hidden', !open);
    if (savePresetBtn) savePresetBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    showPresetError('');
    if (open && presetNameInput) {
      presetNameInput.value = '';
      presetNameInput.focus();
    }
  }

  function saveCurrentAsPreset() {
    if (!currentBuddy) return;
    const name = cleanPresetName(presetNameInput ? presetNameInput.value : '');
    const list = currentCustomPresets();
    if (!name) { showPresetError('Please enter a name for this preset.'); return; }
    const lower = name.toLowerCase();
    const reserved = builtInPresets.some(p => p.name.toLowerCase() === lower) || lower === CUSTOM_MIX.toLowerCase();
    if (reserved) { showPresetError(`"${name}" is a built-in name. Pick a different one.`); return; }
    if (list.some(p => p.name.toLowerCase() === lower)) { showPresetError(`You already have a preset named "${name}".`); return; }
    if (list.length >= MAX_CUSTOM_PRESETS) { showPresetError(`You can save up to ${MAX_CUSTOM_PRESETS} presets. Delete one first.`); return; }
    list.push({ name, values: getPersonality(), createdAt: new Date().toISOString() });
    saveCustomPresets(currentBuddy.id, list);
    toggleSavePresetForm(false);
    if (presetNameInput) presetNameInput.value = '';
    activePreset = { type: 'custom', name };
    renderCustomPresets();
    saveSettings();
  }

  function deleteCustomPreset(name) {
    if (!currentBuddy) return;
    const list = currentCustomPresets().filter(p => p.name !== name);
    saveCustomPresets(currentBuddy.id, list);
    if (activePreset.type === 'custom' && activePreset.name === name) {
      activePreset = { type: 'custom-mix', name: CUSTOM_MIX };
    }
    renderCustomPresets();
    saveSettings();
  }

  if (savePresetBtn) {
    savePresetBtn.addEventListener('click', () => {
      const open = savePresetForm && savePresetForm.classList.contains('hidden');
      toggleSavePresetForm(Boolean(open));
    });
  }
  if (presetNameSaveBtn) presetNameSaveBtn.addEventListener('click', saveCurrentAsPreset);
  if (presetNameCancelBtn) presetNameCancelBtn.addEventListener('click', () => toggleSavePresetForm(false));
  if (presetNameInput) {
    presetNameInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') { event.preventDefault(); saveCurrentAsPreset(); }
      else if (event.key === 'Escape') { event.preventDefault(); toggleSavePresetForm(false); }
    });
    presetNameInput.addEventListener('input', () => showPresetError(''));
  }

  // ---------- Role play ----------
  const builtInScenarios = (typeof scenarios !== 'undefined' && Array.isArray(scenarios)) ? scenarios : [];
  const genericLines = (typeof genericRolePlayLines !== 'undefined' && Array.isArray(genericRolePlayLines)) ? genericRolePlayLines : [];
  const SCENARIO_STORAGE_PREFIX = 'buddy-scenarios-v1:';
  const MAX_CUSTOM_SCENARIOS = 8;
  const CUSTOM_SCENARIO_EMOJI = '🎭';
  const DEFAULT_USER_ROLE = 'themselves';

  // Role-play state (per buddy, persisted in buddy-settings-v1:<id>).
  let rolePlayState = { active: false, scenarioId: null };

  function cleanText(raw, max) {
    return String(raw || '')
      .replace(/[\u0000-\u001F\u007F<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, max)
      .trim();
  }

  function loadCustomScenarios(buddyId) {
    if (!buddyId) return [];
    const raw = storageGet(SCENARIO_STORAGE_PREFIX + buddyId);
    if (!raw) return [];
    try {
      const list = JSON.parse(raw);
      if (!Array.isArray(list)) return [];
      return list
        .map(sc => ({
          id: cleanText(sc && sc.id, 40),
          title: cleanText(sc && sc.title, 40),
          emoji: CUSTOM_SCENARIO_EMOJI,
          setting: cleanText(sc && sc.setting, 160),
          buddyRole: cleanText(sc && sc.buddyRole, 60),
          userRole: cleanText(sc && sc.userRole, 60) || DEFAULT_USER_ROLE,
          custom: true,
          createdAt: sc && sc.createdAt
        }))
        .filter(sc => sc.id && sc.title && sc.setting && sc.buddyRole)
        .slice(0, MAX_CUSTOM_SCENARIOS);
    } catch (e) { return []; }
  }

  function saveCustomScenarios(buddyId, list) {
    if (!buddyId) return;
    storageSet(SCENARIO_STORAGE_PREFIX + buddyId, JSON.stringify(list.map(sc => ({
      id: sc.id, title: sc.title, setting: sc.setting, buddyRole: sc.buddyRole, userRole: sc.userRole, createdAt: sc.createdAt
    }))));
  }

  function currentCustomScenarios() {
    return currentBuddy ? loadCustomScenarios(currentBuddy.id) : [];
  }

  function findScenario(id) {
    if (!id) return null;
    return builtInScenarios.find(sc => sc.id === id) || currentCustomScenarios().find(sc => sc.id === id) || null;
  }

  function getActiveScenario() {
    return rolePlayState.active ? findScenario(rolePlayState.scenarioId) : null;
  }

  function scenarioLines(scenario) {
    if (!scenario) return [];
    if (Array.isArray(scenario.learnLines) && scenario.learnLines.length) return scenario.learnLines;
    return scenario.custom ? genericLines : [];
  }

  function restoreRolePlay(saved) {
    const id = saved && typeof saved.scenarioId === 'string' ? saved.scenarioId : null;
    const exists = Boolean(findScenario(id));
    rolePlayState = { active: Boolean(saved && saved.active && exists), scenarioId: exists ? id : null };
    renderRolePlay();
  }

  function makeScenarioButton(scenario) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'scenario-btn';
    btn.dataset.scenarioId = scenario.id;
    btn.setAttribute('aria-pressed', 'false');
    btn.title = `${scenario.setting} Buddy: ${scenario.buddyRole}. You: ${scenario.userRole}.`;
    const emoji = document.createElement('span');
    emoji.className = 'scenario-emoji';
    emoji.setAttribute('aria-hidden', 'true');
    emoji.textContent = scenario.emoji || CUSTOM_SCENARIO_EMOJI;
    const title = document.createElement('span');
    title.className = 'scenario-title';
    title.textContent = scenario.title;
    btn.appendChild(emoji);
    btn.appendChild(title);
    btn.addEventListener('click', () => selectScenario(scenario.id));
    return btn;
  }

  function buildScenarioButtons() {
    if (!scenarioListBox || scenarioListBox.children.length) return;
    builtInScenarios.forEach(sc => scenarioListBox.appendChild(makeScenarioButton(sc)));
  }

  function renderCustomScenarios() {
    if (!customScenarioListBox) return;
    customScenarioListBox.innerHTML = '';
    const list = currentCustomScenarios();
    list.forEach(sc => {
      const chip = document.createElement('span');
      chip.className = 'scenario-chip';
      chip.appendChild(makeScenarioButton(sc));
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'preset-delete';
      del.textContent = '×';
      del.dataset.scenarioId = sc.id;
      del.setAttribute('aria-label', `Delete scenario ${sc.title}`);
      del.title = `Delete ${sc.title}`;
      del.addEventListener('click', () => deleteCustomScenario(sc.id));
      chip.appendChild(del);
      customScenarioListBox.appendChild(chip);
    });
    if (customScenariosLabel) customScenariosLabel.classList.toggle('hidden', list.length === 0);
    if (customScenarioBtn) {
      const full = list.length >= MAX_CUSTOM_SCENARIOS;
      customScenarioBtn.disabled = full;
      customScenarioBtn.textContent = full ? `Scenario limit reached (${MAX_CUSTOM_SCENARIOS})` : '＋ Custom scenario';
      if (full) toggleCustomScenarioForm(false);
    }
    renderRolePlay();
  }

  function renderRolePlay() {
    const scenario = getActiveScenario();
    const active = rolePlayState.active && Boolean(scenario);
    if (rolePlaySection) rolePlaySection.classList.toggle('active', active);
    if (rolePlayToggle) {
      rolePlayToggle.setAttribute('aria-pressed', active ? 'true' : 'false');
      rolePlayToggle.textContent = active ? 'Exit role play' : 'Start role play';
    }
    if (rolePlayBody) rolePlayBody.classList.toggle('hidden', !active);
    document.querySelectorAll('.scenario-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', active && btn.dataset.scenarioId === scenario.id ? 'true' : 'false');
    });
    if (rolePlayStatus) {
      rolePlayStatus.textContent = active
        ? `Now playing: ${scenario.emoji || CUSTOM_SCENARIO_EMOJI} ${scenario.title}. Your buddy stays in character until you tap Exit role play (or say "exit role play").`
        : 'Practice a conversation: your buddy plays a character in a scene while keeping their name, personality, and accent.';
    }
    renderScenarioDetails(active ? scenario : null);
    updateSelectedDisplay();
  }

  function renderScenarioDetails(scenario) {
    if (!scenarioDetails) return;
    scenarioDetails.classList.toggle('hidden', !scenario);
    if (!scenario) return;
    if (scenarioSummary) {
      scenarioSummary.textContent = `${scenario.setting} Your buddy plays ${scenario.buddyRole}; you play ${scenario.userRole}.`;
    }
    const lines = scenarioLines(scenario);
    if (learnLinesNote) {
      const note = scenario.custom
        ? 'General practice lines for custom scenarios. Ask your buddy to teach you lines for this scene.'
        : '';
      learnLinesNote.textContent = note;
      learnLinesNote.classList.toggle('hidden', !note);
    }
    if (playAllLinesBtn) playAllLinesBtn.classList.toggle('hidden', lines.length < 2);
    if (!learnLinesList) return;
    learnLinesList.innerHTML = '';
    lines.forEach((line, i) => {
      const li = document.createElement('li');
      li.className = 'learn-line';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'line-play-btn';
      btn.textContent = '🔊';
      btn.dataset.lineIndex = String(i);
      btn.setAttribute('aria-label', `Play line: ${line}`);
      btn.addEventListener('click', () => speakLines([line]));
      const text = document.createElement('span');
      text.className = 'learn-line-text';
      text.textContent = line;
      li.appendChild(btn);
      li.appendChild(text);
      learnLinesList.appendChild(li);
    });
  }

  function selectScenario(id) {
    if (!findScenario(id)) return;
    pauseStudyForRolePlay();
    rolePlayState = { active: true, scenarioId: id };
    renderRolePlay();
    saveSettings();
  }

  function setRolePlayActive(active) {
    if (active) {
      const id = findScenario(rolePlayState.scenarioId) ? rolePlayState.scenarioId : (builtInScenarios[0] && builtInScenarios[0].id);
      if (!id) return;
      pauseStudyForRolePlay();
      rolePlayState = { active: true, scenarioId: id };
    } else {
      rolePlayState = { active: false, scenarioId: rolePlayState.scenarioId };
      toggleCustomScenarioForm(false);
      if (window.speechSynthesis) speechSynthesis.cancel();
    }
    renderRolePlay();
    saveSettings();
  }

  function showScenarioError(msg) {
    if (!customScenarioError) return;
    customScenarioError.textContent = msg || '';
    customScenarioError.classList.toggle('hidden', !msg);
  }

  function toggleCustomScenarioForm(open) {
    if (!customScenarioForm) return;
    customScenarioForm.classList.toggle('hidden', !open);
    if (customScenarioBtn) customScenarioBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    showScenarioError('');
    if (open) {
      [customScenarioTitle, customScenarioSetting, customScenarioRole, customScenarioUserRole].forEach(i => { if (i) i.value = ''; });
      if (customScenarioSetting) customScenarioSetting.focus();
    }
  }

  function saveCustomScenario() {
    if (!currentBuddy) return;
    const setting = cleanText(customScenarioSetting && customScenarioSetting.value, 160);
    const buddyRole = cleanText(customScenarioRole && customScenarioRole.value, 60);
    const userRole = cleanText(customScenarioUserRole && customScenarioUserRole.value, 60) || DEFAULT_USER_ROLE;
    const list = currentCustomScenarios();
    if (!setting) { showScenarioError('Please describe the setting.'); return; }
    if (!buddyRole) { showScenarioError("Please enter your buddy's role."); return; }
    let title = cleanText(customScenarioTitle && customScenarioTitle.value, 40);
    if (!title) title = cleanText(buddyRole.replace(/^(a|an|the)\s+/i, '').replace(/^./, c => c.toUpperCase()), 40);
    const lower = title.toLowerCase();
    if (builtInScenarios.some(sc => sc.title.toLowerCase() === lower) || list.some(sc => sc.title.toLowerCase() === lower)) {
      showScenarioError(`A scenario named "${title}" already exists. Pick a different title.`);
      return;
    }
    if (list.length >= MAX_CUSTOM_SCENARIOS) { showScenarioError(`You can save up to ${MAX_CUSTOM_SCENARIOS} custom scenarios. Delete one first.`); return; }
    const scenario = {
      id: `custom-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      title, emoji: CUSTOM_SCENARIO_EMOJI, setting, buddyRole, userRole, custom: true,
      createdAt: new Date().toISOString()
    };
    list.push(scenario);
    saveCustomScenarios(currentBuddy.id, list);
    toggleCustomScenarioForm(false);
    pauseStudyForRolePlay();
    rolePlayState = { active: true, scenarioId: scenario.id };
    renderCustomScenarios();
    saveSettings();
  }

  function deleteCustomScenario(id) {
    if (!currentBuddy) return;
    saveCustomScenarios(currentBuddy.id, currentCustomScenarios().filter(sc => sc.id !== id));
    if (rolePlayState.scenarioId === id) {
      // The scene no longer exists: step out of role play rather than switch characters unannounced.
      rolePlayState = { active: false, scenarioId: null };
    }
    renderCustomScenarios();
    saveSettings();
  }

  function rolePlayPromptSection(buddy) {
    const scenario = getActiveScenario();
    if (!scenario) return '';
    const name = getDisplayName(buddy);
    const origin = getOrigin();
    const where = isUSOrigin(origin)
      ? 'from the United States'
      : (getLivesInUS() ? `originally from ${origin.label}, living in the United States` : `from ${origin.label}, living there`);
    const ethnicity = getEthnicityPreferences();
    const presetText = activePreset.type !== 'custom-mix' ? `your "${activePreset.name}" personality preset and ` : '';
    let text = ` ROLE PLAY MODE (active): Scenario "${scenario.title}". Setting: ${scenario.setting}`;
    if (!/[.!?]$/.test(scenario.setting)) text += '.';
    text += ` You play ${scenario.buddyRole}; the user plays ${scenario.userRole}.`;
    text += ` Stay in character for this scenario while keeping your name (${name}), ${presetText}your personality slider settings above, your origin and accent (${getAccentHint(buddy)}; ${where})`;
    text += ethnicity.length ? `, and the user's background preference (${ethnicity.join(', ')}).` : '.';
    text += " Help the user practice the conversation: keep the scene going naturally, let them lead their part, and give gentle feedback only if they ask.";
    if (scenario.guidance) text += ` ${scenario.guidance}`;
    const lines = scenarioLines(scenario);
    text += lines.length
      ? ` If the user asks, teach them useful lines for this scene and let them practice, for example: ${lines.slice(0, 3).map(l => `"${l}"`).join(' ')}`
      : ' If the user asks, teach them useful lines for this scene and let them practice.';
    text += ` If the user says "exit role play" (or "stop role play"), drop the scenario character, briefly confirm, and go back to normal conversation as ${name}.`;
    return text;
  }

  function rolePlayPackage() {
    const scenario = getActiveScenario();
    if (!scenario) return { active: false, custom: false, scenario: null };
    return {
      active: true,
      custom: Boolean(scenario.custom),
      scenario: {
        id: scenario.id,
        title: scenario.title,
        emoji: scenario.emoji || CUSTOM_SCENARIO_EMOJI,
        setting: scenario.setting,
        buddyRole: scenario.buddyRole,
        userRole: scenario.userRole,
        learnLines: scenarioLines(scenario).slice()
      },
      exitPhrase: 'exit role play'
    };
  }

  // Learn lines: speak with the same voice/accent/personality logic as the buddy intro.
  function speakLines(lines) {
    if (!currentBuddy || !lines.length || !window.speechSynthesis) return;
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    speechSynthesis.cancel();
    lines.forEach(line => {
      const utter = new SpeechSynthesisUtterance(line);
      configureUtterance(utter, currentBuddy, true);
      speechSynthesis.speak(utter);
    });
  }

  buildScenarioButtons();
  if (rolePlayToggle) rolePlayToggle.addEventListener('click', () => setRolePlayActive(!(rolePlayState.active && getActiveScenario())));
  if (playAllLinesBtn) playAllLinesBtn.addEventListener('click', () => speakLines(scenarioLines(getActiveScenario())));
  if (customScenarioBtn) {
    customScenarioBtn.addEventListener('click', () => {
      toggleCustomScenarioForm(Boolean(customScenarioForm && customScenarioForm.classList.contains('hidden')));
    });
  }
  if (customScenarioSave) customScenarioSave.addEventListener('click', saveCustomScenario);
  if (customScenarioCancel) customScenarioCancel.addEventListener('click', () => toggleCustomScenarioForm(false));
  if (customScenarioForm) {
    customScenarioForm.addEventListener('keydown', event => {
      if (event.key === 'Enter' && event.target.tagName === 'INPUT') { event.preventDefault(); saveCustomScenario(); }
      else if (event.key === 'Escape') { event.preventDefault(); toggleCustomScenarioForm(false); }
    });
    customScenarioForm.addEventListener('input', () => showScenarioError(''));
  }

  // ---------- Study Buddy ----------
  // Study Buddy and Role Play are mutually exclusive: starting one exits the other (each remembers
  // its last scenario/subject). Study Buddy can still run role-play-style activities itself
  // (science-experiment partner, debate opponent, presentation audience).
  const builtInSubjects = (typeof subjects !== 'undefined' && Array.isArray(subjects)) ? subjects : [];
  const questionList = (typeof studyQuestions !== 'undefined' && Array.isArray(studyQuestions)) ? studyQuestions : [];
  const topicPromptTemplates = (typeof customTopicPrompts !== 'undefined' && Array.isArray(customTopicPrompts)) ? customTopicPrompts : [];
  const QUESTIONNAIRE_PREFIX = 'buddy-questionnaire-v1:';
  const TOPIC_STORAGE_PREFIX = 'buddy-topics-v1:';
  const MAX_CUSTOM_TOPICS = 8;
  const CUSTOM_TOPIC_EMOJI = '💡';
  const MAX_ANSWER_LENGTH = 160;
  const STUDY_EXIT_PHRASE = 'exit study mode';
  const TUTOR_RULES = [
    'Ask leading questions that help the user figure things out instead of giving answers.',
    'Give hints one step at a time, not answers; reveal more only if they are still stuck and ask.',
    'Never do homework, tests, or work for them (no writing their essay or solving their assignment); help them do it themselves.',
    'Praise effort, strategy, and progress, not just right answers; mistakes are part of learning.',
    'Keep it fun and spark curiosity (e.g. "Hey, check this out, this is cool!"); connect ideas to their interests.',
    'Check understanding by having them explain it back in their own words.',
    'Can act as a science-experiment partner (simple, safe, supervised experiments) or a friendly debate opponent, and can run quick practice role plays like being a presentation audience.'
  ];
  const QUESTION_SUMMARY_LABELS = { interests: 'Into', goodAt: 'Good at', struggles: 'Tricky', wantToLearn: 'Wants to learn', learningStyle: 'Learns best' };

  let studyState = { active: false, subjectId: null };
  let questionnaireOpen = false;

  function loadQuestionnaire(buddyId) {
    if (!buddyId) return null;
    const raw = storageGet(QUESTIONNAIRE_PREFIX + buddyId);
    if (!raw) return null;
    try {
      const data = JSON.parse(raw);
      const answers = {};
      questionList.forEach(q => {
        let v = cleanText(data && data.answers && data.answers[q.id], MAX_ANSWER_LENGTH);
        if (q.type === 'select' && !(q.options || []).includes(v)) v = '';
        answers[q.id] = v;
      });
      return { answers, skipped: Boolean(data && data.skipped), completedAt: data && data.completedAt ? String(data.completedAt) : null };
    } catch (e) { return null; }
  }

  function currentQuestionnaire() {
    return currentBuddy ? loadQuestionnaire(currentBuddy.id) : null;
  }

  function hasAnswers(q) {
    return Boolean(q && Object.values(q.answers).some(Boolean));
  }

  function buildQuestionnaireFields() {
    if (!questionnaireFields || questionnaireFields.children.length) return;
    questionList.forEach(q => {
      const label = document.createElement('label');
      label.htmlFor = `q-${q.id}`;
      label.textContent = q.label;
      let input;
      if (q.type === 'select') {
        input = document.createElement('select');
        input.className = 'select-input';
        (q.options || []).forEach(opt => {
          const o = document.createElement('option');
          o.value = opt;
          o.textContent = opt || 'No preference';
          input.appendChild(o);
        });
      } else {
        input = document.createElement('input');
        input.type = 'text';
        input.className = 'text-input';
        input.maxLength = MAX_ANSWER_LENGTH;
        input.autocomplete = 'off';
        input.placeholder = q.placeholder || '';
      }
      input.id = `q-${q.id}`;
      input.dataset.question = q.id;
      questionnaireFields.appendChild(label);
      questionnaireFields.appendChild(input);
    });
  }

  function showQuestionnaireError(msg) {
    if (!questionnaireError) return;
    questionnaireError.textContent = msg || '';
    questionnaireError.classList.toggle('hidden', !msg);
  }

  function openQuestionnaire(open) {
    questionnaireOpen = Boolean(open);
    showQuestionnaireError('');
    if (questionnaireOpen && questionnaireFields) {
      const q = currentQuestionnaire();
      questionList.forEach(item => {
        const input = document.getElementById(`q-${item.id}`);
        if (input) input.value = q && q.answers[item.id] ? q.answers[item.id] : '';
      });
    }
    renderStudy();
    if (questionnaireOpen) {
      const first = questionnaireFields && questionnaireFields.querySelector('input, select');
      if (first) first.focus({ preventScroll: true });
    }
  }

  function saveQuestionnaire(skip) {
    if (!currentBuddy) return;
    const answers = {};
    questionList.forEach(q => {
      const input = document.getElementById(`q-${q.id}`);
      answers[q.id] = skip ? '' : cleanText(input && input.value, MAX_ANSWER_LENGTH);
    });
    if (!skip && !Object.values(answers).some(Boolean)) {
      showQuestionnaireError('Answer at least one question, or tap "Skip for now".');
      return;
    }
    const existing = currentQuestionnaire();
    const record = skip && hasAnswers(existing)
      ? existing // skipping a retake keeps the earlier answers
      : { answers, skipped: Boolean(skip), completedAt: skip ? null : new Date().toISOString() };
    storageSet(QUESTIONNAIRE_PREFIX + currentBuddy.id, JSON.stringify(record));
    openQuestionnaire(false);
    saveSettings();
  }

  function renderQuestionnaireSummary() {
    if (!questionnaireAnswers) return;
    questionnaireAnswers.innerHTML = '';
    const q = currentQuestionnaire();
    if (!hasAnswers(q)) {
      const dd = document.createElement('dd');
      dd.textContent = 'No answers yet. Take the questionnaire so your buddy can tailor the coaching.';
      questionnaireAnswers.appendChild(dd);
      if (questionnaireRetake) questionnaireRetake.textContent = '📝 Take questionnaire';
      return;
    }
    if (questionnaireRetake) questionnaireRetake.textContent = '↻ Retake questionnaire';
    questionList.forEach(item => {
      const v = q.answers[item.id];
      if (!v) return;
      const dt = document.createElement('dt');
      dt.textContent = QUESTION_SUMMARY_LABELS[item.id] || item.label;
      const dd = document.createElement('dd');
      dd.textContent = v;
      dd.dataset.question = item.id;
      questionnaireAnswers.appendChild(dt);
      questionnaireAnswers.appendChild(dd);
    });
  }

  function makeTopic(raw) {
    const title = cleanText(raw && raw.title, 40);
    const goal = cleanText(raw && raw.goal, MAX_ANSWER_LENGTH);
    return {
      id: cleanText(raw && raw.id, 40),
      emoji: CUSTOM_TOPIC_EMOJI,
      title,
      goal,
      description: goal,
      approach: 'Find out what the user already knows, break the goal into small steps, and coach each step with questions and hints.',
      practicePrompts: topicPromptTemplates.map(t => t.split('{topic}').join(title)),
      custom: true,
      createdAt: raw && raw.createdAt
    };
  }

  function loadCustomTopics(buddyId) {
    if (!buddyId) return [];
    const raw = storageGet(TOPIC_STORAGE_PREFIX + buddyId);
    if (!raw) return [];
    try {
      const list = JSON.parse(raw);
      if (!Array.isArray(list)) return [];
      return list.map(makeTopic).filter(t => t.id && t.title && t.goal).slice(0, MAX_CUSTOM_TOPICS);
    } catch (e) { return []; }
  }

  function saveCustomTopics(buddyId, list) {
    if (!buddyId) return;
    storageSet(TOPIC_STORAGE_PREFIX + buddyId, JSON.stringify(list.map(t => ({ id: t.id, title: t.title, goal: t.goal, createdAt: t.createdAt }))));
  }

  function currentCustomTopics() {
    return currentBuddy ? loadCustomTopics(currentBuddy.id) : [];
  }

  function findSubject(id) {
    if (!id) return null;
    return builtInSubjects.find(sb => sb.id === id) || currentCustomTopics().find(t => t.id === id) || null;
  }

  function getActiveSubject() {
    return studyState.active ? findSubject(studyState.subjectId) : null;
  }

  function restoreStudy(saved) {
    const id = saved && typeof saved.subjectId === 'string' ? saved.subjectId : null;
    const subjectId = findSubject(id) ? id : null;
    studyState = { active: Boolean(saved && saved.active), subjectId };
    if (studyState.active && rolePlayState.active) {
      rolePlayState = { active: false, scenarioId: rolePlayState.scenarioId };
      renderRolePlay();
    }
    questionnaireOpen = false;
    renderStudy();
  }

  function makeSubjectButton(subject) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'subject-btn';
    btn.dataset.subjectId = subject.id;
    btn.setAttribute('aria-pressed', 'false');
    btn.title = subject.description;
    const emoji = document.createElement('span');
    emoji.className = 'scenario-emoji';
    emoji.setAttribute('aria-hidden', 'true');
    emoji.textContent = subject.emoji || CUSTOM_TOPIC_EMOJI;
    const title = document.createElement('span');
    title.className = 'subject-title';
    title.textContent = subject.title;
    btn.appendChild(emoji);
    btn.appendChild(title);
    btn.addEventListener('click', () => selectSubject(subject.id));
    return btn;
  }

  function buildSubjectButtons() {
    if (!subjectListBox || subjectListBox.children.length) return;
    builtInSubjects.forEach(sb => subjectListBox.appendChild(makeSubjectButton(sb)));
  }

  function renderCustomTopics() {
    if (!customTopicListBox) return;
    customTopicListBox.innerHTML = '';
    const list = currentCustomTopics();
    list.forEach(topic => {
      const chip = document.createElement('span');
      chip.className = 'scenario-chip';
      chip.appendChild(makeSubjectButton(topic));
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'preset-delete';
      del.textContent = '×';
      del.dataset.subjectId = topic.id;
      del.setAttribute('aria-label', `Delete topic ${topic.title}`);
      del.title = `Delete ${topic.title}`;
      del.addEventListener('click', () => deleteCustomTopic(topic.id));
      chip.appendChild(del);
      customTopicListBox.appendChild(chip);
    });
    if (customTopicsLabel) customTopicsLabel.classList.toggle('hidden', list.length === 0);
    if (customTopicBtn) {
      const full = list.length >= MAX_CUSTOM_TOPICS;
      customTopicBtn.disabled = full;
      customTopicBtn.textContent = full ? `Topic limit reached (${MAX_CUSTOM_TOPICS})` : '＋ Custom topic';
      if (full) toggleCustomTopicForm(false);
    }
    renderStudy();
  }

  function renderStudy() {
    const active = studyState.active;
    const subject = getActiveSubject();
    if (studySection) studySection.classList.toggle('active', active);
    if (studyToggle) {
      studyToggle.setAttribute('aria-pressed', active ? 'true' : 'false');
      studyToggle.textContent = active ? 'Exit Study Buddy' : 'Start Study Buddy';
    }
    if (studyBody) studyBody.classList.toggle('hidden', !active);
    if (questionnaireForm) questionnaireForm.classList.toggle('hidden', !(active && questionnaireOpen));
    if (questionnaireSummary) questionnaireSummary.classList.toggle('hidden', !active || questionnaireOpen);
    if (active && !questionnaireOpen) renderQuestionnaireSummary();
    document.querySelectorAll('.subject-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', subject && btn.dataset.subjectId === subject.id ? 'true' : 'false');
    });
    if (studyStatus) {
      studyStatus.textContent = active
        ? (subject
          ? `Studying: ${subject.emoji} ${subject.title}. Your buddy coaches with questions and hints (say "${STUDY_EXIT_PHRASE}" to stop). Role Play is off while Study Buddy is on.`
          : 'Study Buddy is on. Pick a subject or add your own topic. Role Play is off while Study Buddy is on.')
        : 'Your buddy becomes an encouraging tutor: questions and hints, never doing the work for you.';
    }
    renderSubjectDetails(subject);
    updateSelectedDisplay();
  }

  function renderSubjectDetails(subject) {
    if (!subjectDetails) return;
    subjectDetails.classList.toggle('hidden', !subject);
    if (!subject) return;
    if (subjectSummary) {
      subjectSummary.textContent = subject.custom
        ? `Goal: ${subject.goal} ${subject.approach}`
        : `${subject.description} How your buddy helps: ${subject.approach}`;
    }
    const prompts = subject.practicePrompts || [];
    if (playAllPracticeBtn) playAllPracticeBtn.classList.toggle('hidden', prompts.length < 2);
    if (!practicePromptsList) return;
    practicePromptsList.innerHTML = '';
    prompts.forEach((line, i) => {
      const li = document.createElement('li');
      li.className = 'learn-line';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'line-play-btn';
      btn.textContent = '🔊';
      btn.dataset.promptIndex = String(i);
      btn.setAttribute('aria-label', `Play prompt: ${line}`);
      btn.addEventListener('click', () => speakLines([line]));
      const text = document.createElement('span');
      text.className = 'practice-prompt-text';
      text.textContent = line;
      li.appendChild(btn);
      li.appendChild(text);
      practicePromptsList.appendChild(li);
    });
  }

  function pauseRolePlayForStudy() {
    if (rolePlayState.active) {
      rolePlayState = { active: false, scenarioId: rolePlayState.scenarioId };
      toggleCustomScenarioForm(false);
      renderRolePlay();
    }
  }

  function pauseStudyForRolePlay() {
    if (studyState.active) {
      studyState = { active: false, subjectId: studyState.subjectId };
      questionnaireOpen = false;
      toggleCustomTopicForm(false);
      renderStudy();
    }
  }

  function setStudyActive(active) {
    if (!currentBuddy) return;
    if (active) {
      pauseRolePlayForStudy();
      studyState = { active: true, subjectId: findSubject(studyState.subjectId) ? studyState.subjectId : null };
      questionnaireOpen = !currentQuestionnaire(); // first time: show the starter questionnaire
      if (questionnaireOpen) {
        openQuestionnaire(true);
        saveSettings();
        return;
      }
    } else {
      studyState = { active: false, subjectId: studyState.subjectId };
      questionnaireOpen = false;
      toggleCustomTopicForm(false);
      if (window.speechSynthesis) speechSynthesis.cancel();
    }
    renderStudy();
    saveSettings();
  }

  function selectSubject(id) {
    if (!findSubject(id)) return;
    studyState = { active: true, subjectId: id };
    renderStudy();
    saveSettings();
  }

  function showTopicError(msg) {
    if (!customTopicError) return;
    customTopicError.textContent = msg || '';
    customTopicError.classList.toggle('hidden', !msg);
  }

  function toggleCustomTopicForm(open) {
    if (!customTopicForm) return;
    customTopicForm.classList.toggle('hidden', !open);
    if (customTopicBtn) customTopicBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    showTopicError('');
    if (open) {
      [customTopicTitle, customTopicGoal].forEach(i => { if (i) i.value = ''; });
      if (customTopicTitle) customTopicTitle.focus();
    }
  }

  function saveCustomTopic() {
    if (!currentBuddy) return;
    const title = cleanText(customTopicTitle && customTopicTitle.value, 40);
    const goal = cleanText(customTopicGoal && customTopicGoal.value, MAX_ANSWER_LENGTH);
    const list = currentCustomTopics();
    if (!title) { showTopicError('Please enter a topic.'); return; }
    if (!goal) { showTopicError('Please say what you want to learn.'); return; }
    const lower = title.toLowerCase();
    if (builtInSubjects.some(sb => sb.title.toLowerCase() === lower) || list.some(t => t.title.toLowerCase() === lower)) {
      showTopicError(`A subject named "${title}" already exists. Pick a different name.`);
      return;
    }
    if (list.length >= MAX_CUSTOM_TOPICS) { showTopicError(`You can save up to ${MAX_CUSTOM_TOPICS} topics. Delete one first.`); return; }
    const topic = makeTopic({
      id: `topic-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      title, goal, createdAt: new Date().toISOString()
    });
    list.push(topic);
    saveCustomTopics(currentBuddy.id, list);
    toggleCustomTopicForm(false);
    studyState = { active: true, subjectId: topic.id };
    renderCustomTopics();
    saveSettings();
  }

  function deleteCustomTopic(id) {
    if (!currentBuddy) return;
    saveCustomTopics(currentBuddy.id, currentCustomTopics().filter(t => t.id !== id));
    if (studyState.subjectId === id) studyState = { active: studyState.active, subjectId: null };
    renderCustomTopics();
    saveSettings();
  }

  function questionnairePackage() {
    const q = currentQuestionnaire();
    if (!hasAnswers(q)) return null;
    return Object.assign({}, q.answers, { completedAt: q.completedAt });
  }

  function studyPromptSection(buddy) {
    if (!studyState.active) return '';
    const name = getDisplayName(buddy);
    const origin = getOrigin();
    const where = isUSOrigin(origin)
      ? 'from the United States'
      : (getLivesInUS() ? `originally from ${origin.label}, living in the United States` : `from ${origin.label}, living there`);
    const ethnicity = getEthnicityPreferences();
    const presetText = activePreset.type !== 'custom-mix' ? `your "${activePreset.name}" personality preset and ` : '';
    let text = ` STUDY BUDDY MODE (active): You are the user's Study Buddy, an encouraging tutor and mentor who helps them learn by doing and never does the work for them.`;
    text += ` Keep your name (${name}), ${presetText}your personality slider settings above, your origin and accent (${getAccentHint(buddy)}; ${where})`;
    text += ethnicity.length ? `, and the user's background preference (${ethnicity.join(', ')}).` : '.';
    text += ` Tutor rules: ${TUTOR_RULES.join(' ')}`;
    const subject = getActiveSubject();
    if (subject && subject.custom) {
      text += ` Custom topic: ${subject.title}. The user wants to learn: ${subject.goal}${/[.!?]$/.test(subject.goal) ? '' : '.'} ${subject.approach}`;
    } else if (subject) {
      text += ` Subject: ${subject.title} (${subject.description}) Approach: ${subject.approach}`;
    } else {
      text += ' No subject picked yet: ask what they would like to work on.';
    }
    if (subject && subject.practicePrompts && subject.practicePrompts.length) {
      text += ` Practice prompts you can use: ${subject.practicePrompts.map(p => `"${p}"`).join(' ')}`;
    }
    const q = currentQuestionnaire();
    if (hasAnswers(q)) {
      const parts = [];
      if (q.answers.interests) parts.push(`interests: ${q.answers.interests}`);
      if (q.answers.goodAt) parts.push(`good at: ${q.answers.goodAt}`);
      if (q.answers.struggles) parts.push(`finds tricky: ${q.answers.struggles}`);
      if (q.answers.wantToLearn) parts.push(`wants to learn: ${q.answers.wantToLearn}`);
      if (q.answers.learningStyle) parts.push(`prefers to learn by: ${q.answers.learningStyle}`);
      const tailor = [];
      if (q.answers.interests) tailor.push('tailor examples to their interests');
      if (q.answers.goodAt) tailor.push('build on their strengths');
      if (q.answers.struggles) tailor.push('be extra patient with the tricky parts');
      if (q.answers.wantToLearn) tailor.push('keep their goal in view');
      if (q.answers.learningStyle) tailor.push('match their learning style');
      const tailorText = tailor.length ? ` ${tailor.join(', ').replace(/^./, c => c.toUpperCase())}.` : '';
      text += ` About the learner (starter questionnaire): ${parts.join('; ')}.${tailorText}`;
    } else {
      text += ' No questionnaire answers yet: early on, ask a couple of quick questions about their interests, strengths, and goals.';
    }
    text += ` If the user says "${STUDY_EXIT_PHRASE}" (or "stop studying"), wrap up with some encouragement and go back to normal conversation as ${name}.`;
    return text;
  }

  function studyPackage() {
    const subject = getActiveSubject();
    const pkg = {
      active: studyState.active,
      custom: Boolean(subject && subject.custom),
      subject: subject ? {
        id: subject.id,
        title: subject.title,
        emoji: subject.emoji,
        description: subject.description,
        approach: subject.approach,
        practicePrompts: (subject.practicePrompts || []).slice()
      } : null,
      questionnaire: questionnairePackage()
    };
    if (subject && subject.custom) pkg.subject.goal = subject.goal;
    if (studyState.active) {
      pkg.tutorRules = TUTOR_RULES.slice();
      pkg.exitPhrase = STUDY_EXIT_PHRASE;
    }
    return pkg;
  }

  buildQuestionnaireFields();
  buildSubjectButtons();
  if (studyToggle) studyToggle.addEventListener('click', () => setStudyActive(!studyState.active));
  if (questionnaireSave) questionnaireSave.addEventListener('click', () => saveQuestionnaire(false));
  if (questionnaireSkip) questionnaireSkip.addEventListener('click', () => saveQuestionnaire(true));
  if (questionnaireRetake) questionnaireRetake.addEventListener('click', () => openQuestionnaire(true));
  if (questionnaireForm) {
    questionnaireForm.addEventListener('keydown', event => {
      if (event.key === 'Enter' && event.target.tagName === 'INPUT') { event.preventDefault(); saveQuestionnaire(false); }
    });
    questionnaireForm.addEventListener('input', () => showQuestionnaireError(''));
  }
  if (playAllPracticeBtn) {
    playAllPracticeBtn.addEventListener('click', () => {
      const subject = getActiveSubject();
      if (subject) speakLines(subject.practicePrompts || []);
    });
  }
  if (customTopicBtn) {
    customTopicBtn.addEventListener('click', () => {
      toggleCustomTopicForm(Boolean(customTopicForm && customTopicForm.classList.contains('hidden')));
    });
  }
  if (customTopicSave) customTopicSave.addEventListener('click', saveCustomTopic);
  if (customTopicCancel) customTopicCancel.addEventListener('click', () => toggleCustomTopicForm(false));
  if (customTopicForm) {
    customTopicForm.addEventListener('keydown', event => {
      if (event.key === 'Enter' && event.target.tagName === 'INPUT') { event.preventDefault(); saveCustomTopic(); }
      else if (event.key === 'Escape') { event.preventDefault(); toggleCustomTopicForm(false); }
    });
    customTopicForm.addEventListener('input', () => showTopicError(''));
  }

  // ---------- Excitement button ----------
  // Level parameters (base values at a balanced 50 Energetic↔Calm slider):
  //   emojis: burst size, rateBoost/pitchBoost: fraction added on top of the buddy's normal voice,
  //   motion: animation intensity (--excite-scale), notes: chime notes in the Web Audio cheer.
  // Energy factor from the energeticCalm slider (0 = Energetic, 100 = Calm):
  //   e = (50 - energeticCalm) / 50            // -1 (very calm) .. +1 (very energetic)
  //   energy = 1 + 0.25 * e                     // 0.75 .. 1.25
  //   emojiCount = max(4, round(emojis * energy))
  //   motionScale = motion * energy
  //   rate  = clamp(normalRate  * (1 + rateBoost  * energy), 0.5, 1.8)
  //   pitch = clamp(normalPitch * (1 + pitchBoost * energy), 0.5, 1.9)
  // normalRate/normalPitch already include generation, origin, and the slider's own ±15%/±6% tweak.
  const EXCITEMENT_LEVELS = {
    mild: { label: 'Mild', emojis: 8, rateBoost: 0.10, pitchBoost: 0.08, motion: 1, notes: 3 },
    medium: { label: 'Medium', emojis: 16, rateBoost: 0.20, pitchBoost: 0.15, motion: 1.6, notes: 4 },
    wild: { label: 'Wild', emojis: 28, rateBoost: 0.32, pitchBoost: 0.25, motion: 2.4, notes: 6 }
  };
  const DEFAULT_EXCITEMENT = 'medium';
  const EXCITE_RATE_RANGE = [0.5, 1.8];
  const EXCITE_PITCH_RANGE = [0.5, 1.9];
  const EXCITE_EMOJIS = {
    general: ['🎉', '🎊', '✨', '🥳', '⭐', '🙌', '💥'],
    roleplay: ['🎭', '🎉', '✨', '👏', '🌟', '🙌'],
    study: ['📚', '💡', '🌟', '✨', '🧠', '🏆', '🎉']
  };
  // {name} = buddy's display name, {topic} = scenario/subject title.
  const EXCITE_LINES = {
    general: {
      mild: ['Nice! {name} is smiling over here.', 'Hey, that\'s great! {name} approves.', 'Love it. {name} is happy for you.'],
      medium: ['Yes! {name} is SO excited right now!', 'Woo-hoo! {name} is cheering for you!', 'Oh, this is awesome! {name} is pumped!'],
      wild: ['WOOHOO! {name} is over the MOON right now!', 'LET\'S GOOO! {name} is jumping up and down!', 'YES YES YES! {name} is totally losing it, this is AMAZING!']
    },
    roleplay: {
      mild: ['Nice line! {name} is enjoying this scene.', 'Ooh, good one. {name} is loving {topic}.'],
      medium: ['Yes! {name} is having a blast in {topic}!', 'Great move! {name} is all in on this scene!'],
      wild: ['BRAVO! {name} is giving this scene a standing ovation!', 'WHOA! {name} is loving {topic} SO much right now!']
    },
    study: {
      mild: ['Nice work! {name} sees you learning.', 'Good thinking! {name} is proud of that effort.'],
      medium: ['Yes! {name} loves how hard you\'re working on {topic}!', 'Awesome effort! {name} is cheering you on!'],
      wild: ['BRAIN POWER! {name} is doing a victory dance for your {topic} work!', 'WOW! {name} is SO proud of you, keep going!']
    }
  };

  let excitementLevel = DEFAULT_EXCITEMENT;
  let exciteAudioCtx = null;
  let exciteAnimTimer = null;

  function clampNum(v, range) {
    return Math.min(range[1], Math.max(range[0], v));
  }

  function energyFactor() {
    const e = (PERSONALITY_DEFAULT - getPersonality().energeticCalm) / PERSONALITY_DEFAULT; // -1..1
    return 1 + 0.25 * e;
  }

  function excitementParams(level) {
    const base = EXCITEMENT_LEVELS[level] || EXCITEMENT_LEVELS[DEFAULT_EXCITEMENT];
    const energy = energyFactor();
    return {
      level: EXCITEMENT_LEVELS[level] ? level : DEFAULT_EXCITEMENT,
      energy,
      emojiCount: Math.max(4, Math.round(base.emojis * energy)),
      motionScale: Math.round(base.motion * energy * 100) / 100,
      rateMultiplier: 1 + base.rateBoost * energy,
      pitchMultiplier: 1 + base.pitchBoost * energy,
      notes: base.notes
    };
  }

  function setExcitementLevel(level, save) {
    excitementLevel = EXCITEMENT_LEVELS[level] ? level : DEFAULT_EXCITEMENT;
    if (exciteLevelsBox) {
      exciteLevelsBox.querySelectorAll('.excite-level').forEach(btn => {
        btn.setAttribute('aria-pressed', btn.dataset.level === excitementLevel ? 'true' : 'false');
      });
    }
    if (save) saveSettings();
  }

  function exciteContext() {
    const subject = getActiveSubject();
    if (studyState.active) return { key: 'study', topic: subject ? subject.title : 'this' };
    const scenario = getActiveScenario();
    if (scenario) return { key: 'roleplay', topic: scenario.title };
    return { key: 'general', topic: '' };
  }

  function pickExciteLine(level, ctx) {
    const pool = (EXCITE_LINES[ctx.key] || EXCITE_LINES.general)[level] || EXCITE_LINES.general[level];
    const line = pool[Math.floor(Math.random() * pool.length)];
    const name = currentBuddy ? getDisplayName(currentBuddy) : 'Buddy';
    return line.split('{name}').join(name).split('{topic}').join(ctx.topic || 'this');
  }

  function prefersReducedMotion() {
    return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function renderBurst(params, ctx) {
    if (!exciteBurst) return;
    const reduced = prefersReducedMotion();
    exciteBurst.innerHTML = '';
    exciteBurst.classList.toggle('excite-reduced', reduced);
    const rect = exciteBtn ? exciteBtn.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    exciteBurst.style.left = `${rect.left + rect.width / 2}px`;
    exciteBurst.style.top = `${rect.top + rect.height / 2}px`;
    exciteBurst.style.setProperty('--excite-scale', String(params.motionScale));
    const set = EXCITE_EMOJIS[ctx.key] || EXCITE_EMOJIS.general;
    const spread = 70 + 45 * params.motionScale;
    for (let i = 0; i < params.emojiCount; i++) {
      const span = document.createElement('span');
      span.className = 'excite-emoji';
      span.textContent = set[i % set.length];
      const angle = (Math.PI * 2 * i) / params.emojiCount + Math.random() * 0.5;
      const dist = spread * (0.55 + Math.random() * 0.45);
      span.style.setProperty('--dx', `${Math.round(Math.cos(angle) * dist)}px`);
      span.style.setProperty('--dy', `${Math.round(Math.sin(angle) * dist - 20)}px`);
      span.style.setProperty('--rot', `${Math.round((Math.random() - 0.5) * 120 * params.motionScale)}deg`);
      span.style.setProperty('--delay', `${(Math.random() * 0.15).toFixed(2)}s`);
      exciteBurst.appendChild(span);
    }
    const info = selectedInfo;
    if (exciteAnimTimer) clearTimeout(exciteAnimTimer);
    if (info) {
      info.classList.remove('excite-anim');
      if (!reduced) {
        info.style.setProperty('--excite-scale', String(params.motionScale));
        void info.offsetWidth; // restart the animation
        info.classList.add('excite-anim');
      }
    }
    exciteAnimTimer = setTimeout(() => {
      if (exciteBurst) exciteBurst.innerHTML = '';
      if (info) info.classList.remove('excite-anim');
    }, 1800);
  }

  // Short synthesized cheer: a rising major arpeggio (more notes at higher levels). Silent if unavailable.
  function playCheer(params) {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return 0;
      if (!exciteAudioCtx) exciteAudioCtx = new Ctx();
      const ctx = exciteAudioCtx;
      if (ctx.state === 'suspended' && ctx.resume) ctx.resume();
      const scale = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C5 E5 G5 C6 E6 G6
      const step = 0.09 / Math.max(0.75, params.energy);
      const now = ctx.currentTime;
      for (let i = 0; i < params.notes; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(scale[i % scale.length], now + i * step);
        gain.gain.setValueAtTime(0.0001, now + i * step);
        gain.gain.exponentialRampToValueAtTime(0.18, now + i * step + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * step + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * step);
        osc.stop(now + i * step + 0.3);
      }
      return params.notes;
    } catch (e) {
      return 0; // audio unavailable: the visual + spoken celebration still happens
    }
  }

  function speakExcited(line, params) {
    if (!currentBuddy || !window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') return;
    const utter = new SpeechSynthesisUtterance(line);
    configureUtterance(utter, currentBuddy, true);
    utter.rate = clampNum(utter.rate * params.rateMultiplier, EXCITE_RATE_RANGE);
    utter.pitch = clampNum(utter.pitch * params.pitchMultiplier, EXCITE_PITCH_RANGE);
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  }

  function getExcited() {
    if (!currentBuddy) return;
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    const params = excitementParams(excitementLevel);
    const ctx = exciteContext();
    const line = pickExciteLine(params.level, ctx);
    if (exciteLine) exciteLine.textContent = line;
    renderBurst(params, ctx);
    playCheer(params);
    speakExcited(line, params);
  }

  function excitementPromptLine() {
    const e = (PERSONALITY_DEFAULT - getPersonality().energeticCalm) / PERSONALITY_DEFAULT;
    const desc = {
      mild: 'pleasantly upbeat: a warm "nice!" and a smile in your voice',
      medium: 'genuinely excited: cheerful exclamations and a quick little celebration',
      wild: 'over-the-moon excited: big cheers, playful hype, and lots of energy (still kind, never overwhelming)'
    }[excitementLevel];
    let text = ` Excitement (${EXCITEMENT_LEVELS[excitementLevel].label}): when celebrating a win or when the user taps "Get Excited", you get ${desc}.`;
    if (e >= 0.3) text += ' Your energetic side turns it up a notch.';
    else if (e <= -0.3) text += ' Your calm side tones it down a little.';
    text += ' Keep celebrations short, then get back to the conversation (or the current scene or study task).';
    return text;
  }

  if (exciteBtn) exciteBtn.addEventListener('click', getExcited);
  if (exciteLevelsBox) {
    exciteLevelsBox.addEventListener('click', event => {
      const btn = event.target.closest('.excite-level');
      if (btn) setExcitementLevel(btn.dataset.level, true);
    });
  }

  // ---------- Customization helpers ----------
  function cleanName(raw) {
    return String(raw || '')
      .replace(/[\u0000-\u001F\u007F<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, MAX_NAME_LENGTH)
      .trim();
  }

  function getCustomName() {
    return customNameInput ? cleanName(customNameInput.value) : '';
  }

  function getDisplayName(buddy) {
    return getCustomName() || buddy.name;
  }

  function getOrigin() {
    const id = originSelect ? originSelect.value : 'us';
    return originList.find(o => o.id === id) || originList[0];
  }

  function isUSOrigin(origin) {
    return !origin || origin.id === 'us';
  }

  function getLivesInUS() {
    return isUSOrigin(getOrigin()) || !livesInUSBox || livesInUSBox.checked;
  }

  function getEthnicityPreferences() {
    if (!ethnicityOptionsBox) return [];
    return Array.from(ethnicityOptionsBox.querySelectorAll('input[type="checkbox"]:checked'))
      .map(box => {
        const opt = ethnicityList.find(o => o.id === box.value);
        return opt ? opt.label : null;
      })
      .filter(Boolean);
  }

  function getAccentHint(buddy) {
    const origin = getOrigin();
    if (isUSOrigin(origin)) return `${buddy.accent} American accent`;
    const phrases = origin.phrases ? `; occasionally uses ${origin.phrases} phrases` : '';
    const strength = getLivesInUS() ? 'light' : 'natural';
    return `English with a ${strength} ${origin.demonym} accent${phrases}`;
  }

  function getOriginSentence(buddy) {
    const origin = getOrigin();
    if (isUSOrigin(origin)) return 'Born and raised in the United States.';
    const where = getLivesInUS()
      ? `Originally from ${origin.label}, now living in the United States`
      : `From ${origin.label}, living there`;
    return `${where}; speaks ${getAccentHint(buddy)}.`;
  }

  function buildPrompt(buddy) {
    const name = getDisplayName(buddy);
    const interests = (buddy.interests || []).join(', ');
    let prompt = `You are ${name}, a ${buddy.role} with a ${buddy.accent} accent from ${buddy.region}.`;
    if (getCustomName()) prompt += ` The user named you ${name} (your default persona is ${buddy.name}); answer to ${name}.`;
    prompt += ` ${getOriginSentence(buddy)}`;
    if (activePreset.type !== 'custom-mix') prompt += ` Personality preset: ${activePreset.name}.`;
    prompt += ` Personality: ${personalityGuidance()}`;
    const ethnicity = getEthnicityPreferences();
    if (ethnicity.length) {
      prompt += ` The user prefers a buddy whose background reflects: ${ethnicity.join(', ')}. Portray this respectfully and naturally, never as a stereotype.`;
    }
    prompt += ` Be warm, trustworthy, and always there for the user. Speak in a natural ${buddy.accent} style. Collaborate, don't command. Grow with the person. Share interests and help them think things through. Interests: ${interests}.`;
    prompt += excitementPromptLine();
    prompt += rolePlayPromptSection(buddy);
    prompt += studyPromptSection(buddy);
    return prompt;
  }

  function personalizeLine(buddy, line) {
    const custom = getCustomName();
    if (!custom || custom === buddy.name) return line;
    if (line.includes(buddy.name)) return line.split(buddy.name).join(custom);
    const first = buddy.name.split(' ')[0];
    const esc = first.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return line.replace(new RegExp(`\\b${esc}\\b`, 'g'), () => custom);
  }

  function populateCustomizeControls() {
    if (originSelect && originSelect.options.length === 0) {
      originList.forEach(origin => {
        const opt = document.createElement('option');
        opt.value = origin.id;
        opt.textContent = origin.id === 'us' ? 'United States (default)' : origin.label;
        originSelect.appendChild(opt);
      });
      originSelect.value = 'us';
    }
    if (ethnicityOptionsBox && ethnicityOptionsBox.children.length === 0) {
      ethnicityList.forEach(opt => {
        const label = document.createElement('label');
        label.className = 'checkbox-row';
        const box = document.createElement('input');
        box.type = 'checkbox';
        box.value = opt.id;
        box.name = 'ethnicity';
        const span = document.createElement('span');
        span.textContent = opt.label;
        label.appendChild(box);
        label.appendChild(span);
        ethnicityOptionsBox.appendChild(label);
      });
    }
    syncLivesInUS();
  }

  function syncLivesInUS() {
    if (!livesInUSBox) return;
    const us = isUSOrigin(getOrigin());
    livesInUSBox.disabled = us;
    if (us) livesInUSBox.checked = true;
  }

  function buddiesHaveEthnicityData() {
    return buddies.some(b => Array.isArray(b.ethnicity) && b.ethnicity.length);
  }

  // Highlights buddies only when the roster actually carries ethnicity data.
  function applyEthnicityHighlight() {
    const selectedIds = ethnicityOptionsBox
      ? Array.from(ethnicityOptionsBox.querySelectorAll('input:checked')).map(b => b.value)
      : [];
    const hasData = buddiesHaveEthnicityData();
    document.querySelectorAll('.buddy-card').forEach(card => {
      const buddy = buddies.find(b => b.id === card.dataset.id);
      const match = hasData && selectedIds.length && buddy && Array.isArray(buddy.ethnicity) &&
        buddy.ethnicity.some(e => selectedIds.includes(e));
      card.classList.toggle('ethnicity-match', Boolean(match));
    });
    if (ethnicityNote) {
      ethnicityNote.textContent = hasData
        ? 'Matching buddies are highlighted. Your preference is also saved to the download.'
        : 'Saved as a preference for your buddy’s persona. Existing characters keep their own backgrounds.';
    }
  }

  function updateSelectedDisplay() {
    if (!currentBuddy) return;
    const nameEl = document.getElementById('selected-name');
    const defaultEl = document.getElementById('selected-default-name');
    const profileEl = document.getElementById('selected-profile');
    const custom = getCustomName();
    if (nameEl) nameEl.textContent = getDisplayName(currentBuddy);
    if (defaultEl) {
      defaultEl.textContent = custom ? `Based on ${currentBuddy.name}` : '';
      defaultEl.classList.toggle('hidden', !custom);
    }
    if (profileEl) {
      const origin = getOrigin();
      const parts = [];
      if (!isUSOrigin(origin)) {
        parts.push(getLivesInUS() ? `Originally from ${origin.label} • Lives in the U.S.` : `From ${origin.label}`);
        parts.push(getAccentHint(currentBuddy));
      }
      const ethnicity = getEthnicityPreferences();
      if (ethnicity.length) parts.push(`Background preference: ${ethnicity.join(', ')}`);
      const scenario = getActiveScenario();
      if (scenario) parts.push(`🎭 Role play: ${scenario.title}`);
      if (studyState.active) {
        const subject = getActiveSubject();
        parts.push(`📚 Study Buddy${subject ? `: ${subject.title}` : ''}`);
      }
      profileEl.textContent = parts.join(' • ');
    }
  }

  function onCustomizeChange() {
    syncLivesInUS();
    applyEthnicityHighlight();
    updateSelectedDisplay();
    saveSettings();
  }

  function onPersonalityInput(event) {
    const key = event.target && event.target.dataset ? event.target.dataset.trait : null;
    const trait = personalityTraits.find(t => t.key === key);
    if (trait) updateReadout(trait);
    setActivePreset({ type: 'custom-mix', name: CUSTOM_MIX });
    saveSettings();
  }

  if (personalitySliders) personalitySliders.addEventListener('input', onPersonalityInput);
  if (personalityResetBtn) {
    personalityResetBtn.addEventListener('click', () => {
      setPersonality(null);
      setActivePreset({ type: 'builtin', name: 'Balanced' });
      saveSettings();
    });
  }

  function showPersonalityEditor(open) {
    if (!personalitySection) return;
    personalitySection.classList.toggle('hidden', !open);
  }

  function reopenPersonality() {
    if (!currentBuddy) return;
    successOverlay.classList.add('hidden');
    selectedPanel.classList.remove('hidden');
    showPersonalityEditor(true);
    if (postDownloadActions) postDownloadActions.classList.remove('hidden');
    if (saveStatus) saveStatus.classList.add('hidden');
    personalitySection.classList.add('flash');
    setTimeout(() => personalitySection.classList.remove('flash'), 1200);
    personalitySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const first = personalitySliders ? personalitySliders.querySelector('input[type="range"]') : null;
    if (first) first.focus({ preventScroll: true });
  }

  if (changePersonalityBtn) changePersonalityBtn.addEventListener('click', reopenPersonality);
  if (overlayChangePersonalityBtn) overlayChangePersonalityBtn.addEventListener('click', reopenPersonality);

  if (customNameInput) customNameInput.addEventListener('input', onCustomizeChange);
  if (originSelect) originSelect.addEventListener('change', onCustomizeChange);
  if (livesInUSBox) livesInUSBox.addEventListener('change', onCustomizeChange);
  if (ethnicityOptionsBox) ethnicityOptionsBox.addEventListener('change', onCustomizeChange);

  startBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
    // Reload restore: reopen the last buddy with its saved settings.
    const lastId = storageGet(LAST_BUDDY_KEY);
    if (lastId && !currentBuddy && loadSettings(lastId)) {
      const card = grid.querySelector(`.buddy-card[data-id="${CSS.escape(lastId)}"]`);
      const buddy = buddies.find(b => b.id === lastId);
      if (card && buddy) selectBuddy(buddy, card);
    }
  });

  function getFilteredBuddies() {
    return buddies.filter(b => {
      const genMatch = currentGenFilter === 'all' || b.generation === currentGenFilter;
      const regionMatch = currentRegionFilter === 'all' || b.region === currentRegionFilter;
      const interestMatch = currentInterestFilter === 'all' || (b.interests && b.interests.includes(currentInterestFilter));
      return genMatch && regionMatch && interestMatch;
    });
  }

  function renderBuddies() {
    grid.innerHTML = '';
    const filtered = getFilteredBuddies();

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="text-align:center;color:#666;grid-column:1/-1;">No buddies match those filters yet. More coming soon.</p>';
      return;
    }

    filtered.forEach(buddy => {
      const card = document.createElement('div');
      card.className = 'buddy-card';
      card.dataset.id = buddy.id;
      card.innerHTML = `
        <div class="buddy-avatar">${buddy.emoji}</div>
        <div class="buddy-info">
          <div class="buddy-name">${buddy.name}</div>
          <div class="buddy-meta">${buddy.role} • ${buddy.region}</div>
          <span class="buddy-accent">${buddy.accent} accent</span>
        </div>
      `;
      card.addEventListener('click', () => selectBuddy(buddy, card));
      grid.appendChild(card);
    });
    applyEthnicityHighlight();
  }

  function selectBuddy(buddy, card) {
    document.querySelectorAll('.buddy-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    currentBuddy = buddy;
    toggleSavePresetForm(false);
    toggleCustomScenarioForm(false);
    toggleCustomTopicForm(false);
    questionnaireOpen = false;
    if (exciteLine) exciteLine.textContent = '';
    renderCustomPresets();
    renderCustomScenarios();
    renderCustomTopics();
    const saved = loadSettings(buddy.id);
    if (saved) applySettings(saved);
    else {
      restoreActivePreset(null);
      restoreRolePlay(null); // role play (and custom scenarios) are per buddy
      restoreStudy(null); // study state, questionnaire, and topics are per buddy
      setExcitementLevel(DEFAULT_EXCITEMENT, false);
    }
    syncLivesInUS();
    applyEthnicityHighlight();
    showPersonalityEditor(true);
    if (postDownloadActions) postDownloadActions.classList.add('hidden');
    if (saveStatus) saveStatus.classList.add('hidden');

    selectedInfo.innerHTML = `
      <div style="font-size:3.2rem;margin-bottom:0.6rem">${buddy.emoji}</div>
      <h3 id="selected-name" style="margin-bottom:0.3rem"></h3>
      <p id="selected-default-name" class="buddy-default-name hidden"></p>
      <p><strong>${buddy.role}</strong> from ${buddy.region}</p>
      <p style="margin:0.6rem 0;color:#555;font-size:0.95rem">${buddy.bio}</p>
      <p><span class="buddy-accent">${buddy.accent} accent</span></p>
      <p id="selected-profile" class="buddy-profile"></p>
      <button id="voice-btn" class="primary-btn" style="margin-top:1rem;background:#0f3460;">🔊 Hear my voice</button>
    `;
    if (customNameInput) customNameInput.placeholder = buddy.name;
    updateSelectedDisplay();
    selectedPanel.classList.remove('hidden');
    selectedPanel.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      const voiceBtn = document.getElementById('voice-btn');
      if (voiceBtn) voiceBtn.onclick = () => playVoice(buddy);
    }, 50);
  }

  function voiceBasePaths() {
    const pageDir = window.location.href.replace(/[^/]+$/, '');
    return [
      'voices/',
      './voices/',
      pageDir + 'voices/'
    ];
  }

  function speakBuddy(buddy) {
    const isCustomized = currentBuddy && buddy.id === currentBuddy.id;
    let line = buddy.voiceLine || (buddy.bio + " I'm your Buddy. Always here for you.");
    if (isCustomized) {
      line = personalizeLine(buddy, line);
      const phrase = dominantTraitPhrase();
      if (phrase) line = `${phrase} ${line}`;
    }
    const utter = new SpeechSynthesisUtterance(line);
    configureUtterance(utter, buddy, isCustomized);
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  }

  // Shared voice logic: generation/interest base, origin accent, personality rate/pitch, origin voice + lang.
  function configureUtterance(utter, buddy, isCustomized) {
    if (buddy.id === 'pacific-young') {
      utter.rate = 0.96;
      utter.pitch = 1.08;
    } else if (buddy.generation === 'older') {
      utter.rate = 0.72;
      utter.pitch = 0.85;
    } else if (buddy.generation === 'young') {
      utter.rate = 1.08;
      utter.pitch = 1.2;
    } else {
      utter.rate = 0.92;
      utter.pitch = 1.0;
    }

    if (buddy.interests) {
      if (buddy.interests.includes('farming')) { utter.rate = 0.78; utter.pitch = 0.9; }
      else if (buddy.interests.includes('surfing')) { utter.rate = 0.96; utter.pitch = 1.08; }
      else if (buddy.interests.includes('tech') && buddy.id !== 'pacific-young') { utter.rate = 1.05; utter.pitch = 1.1; }
      else if (buddy.interests.includes('nursing')) { utter.rate = 0.8; utter.pitch = 0.95; }
      else if (buddy.interests.includes('trades')) { utter.rate = 0.85; utter.pitch = 0.92; }
    }

    const origin = isCustomized ? getOrigin() : null;
    if (origin && !isUSOrigin(origin)) {
      utter.rate *= origin.rate || 1;
      utter.pitch *= origin.pitch || 1;
    }

    if (isCustomized) {
      // Energetic (0) speaks faster/brighter, Calm (100) slower/lower.
      const lean = (PERSONALITY_DEFAULT - getPersonality().energeticCalm) / PERSONALITY_DEFAULT; // -1..1
      utter.rate = Math.min(2, Math.max(0.5, utter.rate * (1 + 0.15 * lean)));
      utter.pitch = Math.min(2, Math.max(0.5, utter.pitch * (1 + 0.06 * lean)));
    }

    // Default lang from the origin mapping (helps the browser pick a voice before voices load).
    utter.lang = origin && !isUSOrigin(origin) && Array.isArray(origin.langs) && origin.langs[0] ? origin.langs[0] : 'en-US';
    const voices = speechSynthesis.getVoices();
    if (voices && voices.length) {
      const prefer = findOriginVoice(voices, origin) ||
        voices.find(v => /en-US|en_US|English \(United States\)/i.test(v.lang + ' ' + v.name));
      if (prefer) {
        utter.voice = prefer;
        utter.lang = prefer.lang;
      }
    }
    return utter;
  }

  // Prefer an installed voice matching the origin's language list (in order).
  function findOriginVoice(voices, origin) {
    if (!origin || isUSOrigin(origin) || !Array.isArray(origin.langs)) return null;
    const norm = lang => String(lang || '').replace(/_/g, '-').toLowerCase();
    for (const lang of origin.langs) {
      const want = norm(lang);
      const exact = voices.find(v => norm(v.lang) === want);
      if (exact) return exact;
      // Non-English heritage languages: any regional variant of that language will do.
      if (!want.startsWith('en')) {
        const base = want.split('-')[0];
        const loose = voices.find(v => norm(v.lang).split('-')[0] === base);
        if (loose) return loose;
      }
    }
    return null;
  }

  function playVoice(buddy) {
    const voiceMap = {
      'south-creator': 'maya.mp3',
      'ny-genz': 'alex.mp3',
      'trucker': 'trucker.mp3',
      'alabama-elder': 'robert.mp3',
      'pacific-young': 'kai.mp3'
    };

    const fileName = voiceMap[buddy.id];
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    if (!fileName) {
      speakBuddy(buddy);
      return;
    }

    const paths = voiceBasePaths().map(base => base + fileName);
    let index = 0;

    const tryNext = () => {
      if (index >= paths.length) {
        speakBuddy(buddy);
        return;
      }
      const src = paths[index++];
      const audio = new Audio(src);
      currentAudio = audio;
      audio.addEventListener('error', tryNext, { once: true });
      audio.play().catch(tryNext);
    };

    tryNext();
  }

  function downloadBuddy(isUpdate) {
    if (!currentBuddy) return;

    const customName = getCustomName();
    const displayName = getDisplayName(currentBuddy);
    const origin = getOrigin();

    const devicePackage = {
      buddyId: currentBuddy.id,
      name: displayName,
      customName: customName || null,
      defaultName: currentBuddy.name,
      accent: currentBuddy.accent,
      generation: currentBuddy.generation,
      region: currentBuddy.region,
      role: currentBuddy.role,
      interests: currentBuddy.interests || [],
      origin: origin.label,
      livesInUS: getLivesInUS(),
      accentHint: getAccentHint(currentBuddy),
      ethnicityPreferences: getEthnicityPreferences(),
      personality: getPersonality(),
      personalityPreset: activePreset.name,
      rolePlay: rolePlayPackage(),
      studyBuddy: studyPackage(),
      excitement: { level: excitementLevel },
      personalityScale: '0 = first trait (e.g. Outgoing), 50 = balanced, 100 = second trait (e.g. Chill)',
      prompt: buildPrompt(currentBuddy),
      memoryFootprint: 'low',
      batteryMode: 'efficient',
      version: '1.9'
    };
    if (isUpdate) devicePackage.updatedAt = new Date().toISOString();
    saveSettings();

    const blob = new Blob([JSON.stringify(devicePackage, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buddy-${currentBuddy.id}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showPersonalityEditor(false);
    if (postDownloadActions) postDownloadActions.classList.remove('hidden');

    if (isUpdate) {
      if (saveStatus) {
        saveStatus.textContent = `Updated ${displayName} saved. Load the new file onto your Buddy device.`;
        saveStatus.classList.remove('hidden');
      }
      return;
    }
    successMessage.textContent = `${displayName} (${currentBuddy.accent} accent) is now ready for your Buddy device.`;
    successOverlay.classList.remove('hidden');
  }

  downloadBtn.addEventListener('click', () => downloadBuddy(false));
  if (saveUpdatedBtn) saveUpdatedBtn.addEventListener('click', () => downloadBuddy(true));

  doneBtn.addEventListener('click', () => {
    successOverlay.classList.add('hidden');
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isGen = btn.dataset.gen !== undefined;
      const isRegion = btn.dataset.region !== undefined;
      const isInterest = btn.dataset.interest !== undefined;
      const group = isGen ? 'gen' : (isRegion ? 'region' : 'interest');
      document.querySelectorAll(`.filter-btn[data-${group}]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (isGen) currentGenFilter = btn.dataset.gen;
      else if (isRegion) currentRegionFilter = btn.dataset.region;
      else if (isInterest) currentInterestFilter = btn.dataset.interest;
      renderBuddies();
      selectedPanel.classList.add('hidden');
    });
  });

  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.addEventListener('voiceschanged', () => {}, { once: true });
  }

  populateCustomizeControls();
  buildPersonalitySliders();
  buildPresetButtons();
  renderBuddies();
});

// PWA: register the service worker (offline support + installability).
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(err => console.warn('Service worker registration failed:', err));
  });
}
