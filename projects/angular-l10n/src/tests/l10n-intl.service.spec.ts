import { TestBed } from '@angular/core/testing';

import { L10nLoader, L10nIntlService, L10nTranslationService, L10nConfig, L10nIntlModule } from '../public-api';
import { L10nTranslationModule } from '../lib/modules/l10n-translation.module';

describe('L10nIntlService', () => {
    let loader: L10nLoader;
    let intl: L10nIntlService;
    let translation: L10nTranslationService;
    const mockAsset = {
        'it-IT': {
            systemArchitect: 'Progettista IT',
            accountant: 'Ragioniere',
            juniorTechnicalAuthor: 'Scrittore tecnico Junior',
            seniorJavascriptDeveloper: 'Programmatore Javascript Senior',
            one: 'Uno'
        },
        'en-US': {}
    };
    const config: L10nConfig = {
        format: 'language-region',
        providers: [
            { name: 'asset', asset: mockAsset }
        ],
        keySeparator: '.',
        defaultLocale: { language: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' },
        schema: [
            { locale: { language: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' } }
        ]
    };
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                L10nTranslationModule.forRoot(config),
                L10nIntlModule
            ]
        });
        loader = TestBed.inject(L10nLoader);
        intl = TestBed.inject(L10nIntlService);
        translation = TestBed.inject(L10nTranslationService);
        await loader.init();
    });
    it('should format dates', () => {
        const value = new Date('2019-09-19T16:30:00Z');
        expect(intl.formatDate(value)).toEqual('9/19/2019');
        expect(intl.formatDate(value, { dateStyle: 'full' })).toEqual('Thursday, September 19, 2019');
        expect(intl.formatDate(value, { dateStyle: 'full', timeStyle: 'short' })).toEqual('Thursday, September 19, 2019, 9:30 AM');
        expect(intl.formatDate(
            value,
            { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        )).toEqual('Thursday, September 19, 2019, 9:30 AM');
    });
    it('should format numbers', () => {
        const value = 1234.5;
        expect(intl.formatNumber(value)).toEqual('1,234.5');
        expect(intl.formatNumber(value, { digits: '1.2-2' })).toEqual('1,234.50');
        expect(intl.formatNumber(value, { digits: '1.2-2', style: 'currency' })).toEqual('$1,234.50');
        expect(intl.formatNumber(
            value,
            { minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2 }
        )).toEqual('1,234.50');
    });
    it('should format relative times', () => {
        expect(intl.formatRelativeTime(-1, 'day')).toEqual('1 day ago');
        expect(intl.formatRelativeTime(-1, 'day', { numeric: 'auto', style: 'long' })).toEqual('yesterday');
    });
    it('should get the currency symbol', () => {
        expect(intl.getCurrencySymbol()).toEqual('$');
    });
    it('should compare', async () => {
        await translation.setLocale({ language: 'it-IT' });
        const list = ['systemArchitect', 'accountant', 'juniorTechnicalAuthor', 'seniorJavascriptDeveloper', 'accountant'];
        const orderedList = list.sort((key1: string, key2: string) => {
            return intl.compare(key1, key2, { usage: 'sort', sensitivity: 'variant' });
        });
        expect(orderedList).toEqual(['systemArchitect', 'seniorJavascriptDeveloper', 'accountant', 'accountant', 'juniorTechnicalAuthor']);
    });
    it('should get the plural', async () => {
        await translation.setLocale({ language: 'it-IT' });
        expect(intl.plural(1)).toEqual('Uno');
    });
    it('should list', async () => {
        await translation.setLocale({ language: 'it-IT' });
        const list = ['systemArchitect', 'juniorTechnicalAuthor', 'seniorJavascriptDeveloper'];
        expect(intl.list(list)).toEqual('Progettista IT, Scrittore tecnico Junior e Programmatore Javascript Senior');
    });
});
